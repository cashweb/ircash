// source: stealth.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.stealth.StealthOutpoints', null, global);
goog.exportSymbol('proto.stealth.StealthPaymentEntry', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.stealth.StealthOutpoints = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.stealth.StealthOutpoints.repeatedFields_, null);
};
goog.inherits(proto.stealth.StealthOutpoints, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.stealth.StealthOutpoints.displayName = 'proto.stealth.StealthOutpoints';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.stealth.StealthPaymentEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.stealth.StealthPaymentEntry.repeatedFields_, null);
};
goog.inherits(proto.stealth.StealthPaymentEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.stealth.StealthPaymentEntry.displayName = 'proto.stealth.StealthPaymentEntry';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.stealth.StealthOutpoints.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.stealth.StealthOutpoints.prototype.toObject = function(opt_includeInstance) {
  return proto.stealth.StealthOutpoints.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stealth.StealthOutpoints} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stealth.StealthOutpoints.toObject = function(includeInstance, msg) {
  var f, obj = {
    stealthTx: msg.getStealthTx_asB64(),
    voutsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.stealth.StealthOutpoints}
 */
proto.stealth.StealthOutpoints.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stealth.StealthOutpoints;
  return proto.stealth.StealthOutpoints.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stealth.StealthOutpoints} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stealth.StealthOutpoints}
 */
proto.stealth.StealthOutpoints.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setStealthTx(value);
      break;
    case 2:
      var value = /** @type {!Array<number>} */ (reader.readPackedUint32());
      msg.setVoutsList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.stealth.StealthOutpoints.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stealth.StealthOutpoints.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stealth.StealthOutpoints} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stealth.StealthOutpoints.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStealthTx_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getVoutsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      2,
      f
    );
  }
};


/**
 * optional bytes stealth_tx = 1;
 * @return {!(string|Uint8Array)}
 */
proto.stealth.StealthOutpoints.prototype.getStealthTx = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes stealth_tx = 1;
 * This is a type-conversion wrapper around `getStealthTx()`
 * @return {string}
 */
proto.stealth.StealthOutpoints.prototype.getStealthTx_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getStealthTx()));
};


/**
 * optional bytes stealth_tx = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getStealthTx()`
 * @return {!Uint8Array}
 */
proto.stealth.StealthOutpoints.prototype.getStealthTx_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getStealthTx()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.stealth.StealthOutpoints} returns this
 */
proto.stealth.StealthOutpoints.prototype.setStealthTx = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * repeated uint32 vouts = 2;
 * @return {!Array<number>}
 */
proto.stealth.StealthOutpoints.prototype.getVoutsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.stealth.StealthOutpoints} returns this
 */
proto.stealth.StealthOutpoints.prototype.setVoutsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.stealth.StealthOutpoints} returns this
 */
proto.stealth.StealthOutpoints.prototype.addVouts = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.stealth.StealthOutpoints} returns this
 */
proto.stealth.StealthOutpoints.prototype.clearVoutsList = function() {
  return this.setVoutsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.stealth.StealthPaymentEntry.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.stealth.StealthPaymentEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.stealth.StealthPaymentEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stealth.StealthPaymentEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stealth.StealthPaymentEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
    ephemeralPubKey: msg.getEphemeralPubKey_asB64(),
    outpointsList: jspb.Message.toObjectList(msg.getOutpointsList(),
    proto.stealth.StealthOutpoints.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.stealth.StealthPaymentEntry}
 */
proto.stealth.StealthPaymentEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stealth.StealthPaymentEntry;
  return proto.stealth.StealthPaymentEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stealth.StealthPaymentEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stealth.StealthPaymentEntry}
 */
proto.stealth.StealthPaymentEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setEphemeralPubKey(value);
      break;
    case 2:
      var value = new proto.stealth.StealthOutpoints;
      reader.readMessage(value,proto.stealth.StealthOutpoints.deserializeBinaryFromReader);
      msg.addOutpoints(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.stealth.StealthPaymentEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stealth.StealthPaymentEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stealth.StealthPaymentEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stealth.StealthPaymentEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEphemeralPubKey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getOutpointsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.stealth.StealthOutpoints.serializeBinaryToWriter
    );
  }
};


/**
 * optional bytes ephemeral_pub_key = 1;
 * @return {!(string|Uint8Array)}
 */
proto.stealth.StealthPaymentEntry.prototype.getEphemeralPubKey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes ephemeral_pub_key = 1;
 * This is a type-conversion wrapper around `getEphemeralPubKey()`
 * @return {string}
 */
proto.stealth.StealthPaymentEntry.prototype.getEphemeralPubKey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getEphemeralPubKey()));
};


/**
 * optional bytes ephemeral_pub_key = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getEphemeralPubKey()`
 * @return {!Uint8Array}
 */
proto.stealth.StealthPaymentEntry.prototype.getEphemeralPubKey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getEphemeralPubKey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.stealth.StealthPaymentEntry} returns this
 */
proto.stealth.StealthPaymentEntry.prototype.setEphemeralPubKey = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * repeated StealthOutpoints outpoints = 2;
 * @return {!Array<!proto.stealth.StealthOutpoints>}
 */
proto.stealth.StealthPaymentEntry.prototype.getOutpointsList = function() {
  return /** @type{!Array<!proto.stealth.StealthOutpoints>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.stealth.StealthOutpoints, 2));
};


/**
 * @param {!Array<!proto.stealth.StealthOutpoints>} value
 * @return {!proto.stealth.StealthPaymentEntry} returns this
*/
proto.stealth.StealthPaymentEntry.prototype.setOutpointsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.stealth.StealthOutpoints=} opt_value
 * @param {number=} opt_index
 * @return {!proto.stealth.StealthOutpoints}
 */
proto.stealth.StealthPaymentEntry.prototype.addOutpoints = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.stealth.StealthOutpoints, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.stealth.StealthPaymentEntry} returns this
 */
proto.stealth.StealthPaymentEntry.prototype.clearOutpointsList = function() {
  return this.setOutpointsList([]);
};


goog.object.extend(exports, proto.stealth);
