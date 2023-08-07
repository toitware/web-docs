# Copyright (C) 2023 Toitware ApS.
# Use of this source code is governed by a Zero-Clause BSD license that can
# be found in the LICENSE_BSD0 file.

TOIT_SDK := /opt/toit-sdk
TOIT_COMPILE := $(TOIT_SDK)/bin/toit.compile
TOIT_FIRMWARE := $(TOIT_SDK)/tools/firmware
VERSION := v2.0.0-alpha.90
ENVELOPE_URL := https://github.com/toitlang/toit/releases/download/$(VERSION)/firmware-esp32.gz

.PHONY: all
all: ota.bin

# Always repuild the firmware envelope since we modify it.
.PHONY: firmware.envelope
firmware.envelope: firmware.envelope.gz
	gunzip -c firmware.envelope.gz > firmware.envelope

firmware.envelop.gz:
	curl -L -o $@ $(ENVELOPE_URL)

%.snapshot: %.toit
	$(TOIT_COMPILE) -w $@ $<

ota.bin: validate.snapshot firmware.envelope
	$(TOIT_FIRMWARE) -e firmware.envelope container install validate validate.snapshot
	$(TOIT_FIRMWARE) -e firmware.envelope extract --format=binary -o ota.bin

.PHONY:
serve: ota.bin
	python3 -m http.server 8000
