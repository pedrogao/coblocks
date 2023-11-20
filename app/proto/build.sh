#!/bin/sh

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_out=./src --ts_proto_opt=nestJs=true --ts_proto_opt=addGrpcMetadata=true \
--ts_proto_opt=outputServices=grpc-js --proto_path=./pb project.proto