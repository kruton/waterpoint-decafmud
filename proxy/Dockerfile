FROM alpine:edge

RUN apk --update add python3 py3-numpy

RUN mkdir /app
COPY requirements.txt /app
WORKDIR /app

RUN apk --update add --virtual build-deps py3-pip python3-dev build-base \
    && pip3 install -r requirements.txt \
    && apk del build-deps \
    && rm -rf /var/cache/apk/*

EXPOSE 8308

ENTRYPOINT ["/app/proxy.py"]

COPY proxy.py /app
