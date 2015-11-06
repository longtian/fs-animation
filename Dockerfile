FROM node
MAINTAINER wyvernnot <wyvernnot@gmail.com>
COPY . .
RUN npm install
ENV PORT 8001
ENV HOSTNAME 127.0.0.1
ENV LOG_LEVEL trace
EXPOSE 8001
CMD ["npm","run-script","docker"]