#!/bin/sh

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_out=./src --ts_proto_opt=nestJs=true --ts_proto_opt=addGrpcMetadata=true \
--ts_proto_opt=outputServices=grpc-js --ts_proto_opt=exportCommonSymbols=false \
--proto_path=./pb project.proto user.proto room.proto project-api-key.proto room-doc.proto \
room-hook.proto room-metadata.proto