all:
	python setup.py install

dev:
	python setup.py develop

clean:
	python setup.py develop --uninstall
	pip uninstall -y radioapi
	rm -rf build dist radioapi.egg-info

init:
	pip install -r requirements.txt

reqs:
	pip uninstall -y radioapi
	pip freeze > requirements.txt