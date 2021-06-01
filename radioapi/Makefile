PY = python3
PIP = pip3


all:
	${PY} setup.py install

clean:
	${PIP} uninstall -y radioapi
	rm -rf build dist radioapi.egg-info

dev:
	${PY} setup.py develop

enddev:
	${PY} setup.py develop --uninstall
	rm -rf build dist radioapi.egg-info

init:
	${PIP} install -r requirements.txt

venv:
	$(PY) -m venv venv

reqs:
	${PIP} uninstall -y radioapi
	${PIP} freeze > requirements.txt

help:
	@echo "COMMANDS:"
	@echo "  all:    Build and install package"
	@echo "  clean:  Uninstall this package"
	@echo "  dev:    Create links to package for hot development changes"
	@echo "  enddev: Remove links to package for hot development changes"
	@echo "  init:   Install the requirements in the current enviornment"
	@echo "  venv:   Create a virtual enviornment for the project"
	@echo "  reqs:   Add all requirements to the requirements.txt file"
