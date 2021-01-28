.PHONY: build
build:
	cp pipeline.yaml ../.github/workflows/pipeline.yaml
	echo "      - run: ${BUILD}" >> ../.github/workflows/pipeline.yaml
	echo "      - run: ${PUBLISH}" >> ../.github/workflows/pipeline.yaml