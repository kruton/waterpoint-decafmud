#!/usr/bin/env python3

# WS server that proxies to waterpoint

import asyncio
import websockets
import signal


listen_address = '0.0.0.0'
listen_port = 8308

target_address = 'waterpoint.moo.mud.org'
target_port = 8301


async def tcp_to_ws(stop, websocket, reader):
    try:
        while not reader.at_eof():
            await websocket.send(await reader.read(8192))
    except ConnectionClosed:
        pass
    finally:
        stop.cancel()

async def ws_to_tcp(stop, websocket, writer):
    try:
        async for message in websocket:
            writer.write(message)
    except ConnectionClosed:
        pass
    finally:
        stop.cancel()

async def tcp_proxy(websocket, path):
    address = websocket.remote_address
    print('New connection from {}'.format(address))
    try:
        stop = asyncio.Future()
        tcp_reader, tcp_writer = await asyncio.open_connection(
            target_address, target_port)
        pipe1 = tcp_to_ws(stop, websocket, tcp_reader)
        pipe2 = ws_to_tcp(stop, websocket, tcp_writer)
        await asyncio.gather(stop, pipe1, pipe2)
    except asyncio.CancelledError:
        pass
    finally:
        websocket.close()
        tcp_writer.close()
        print('Connection closed from {}'.format(address))

async def tcp_proxy_server(stop):
    async with websockets.serve(tcp_proxy, listen_address, listen_port,
                                subprotocols=['binary']):
        print('Server started on {} port {}'.format(listen_address, listen_port))
        await stop

def main():
    loop = asyncio.get_event_loop()

    stop = asyncio.Future()
    loop.add_signal_handler(signal.SIGINT, stop.set_result, None)
    loop.add_signal_handler(signal.SIGTERM, stop.set_result, None)

    server = loop.run_until_complete(tcp_proxy_server(stop))


if __name__ == "__main__":
    main()
