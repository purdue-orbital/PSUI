all:
	python setup.py install

dev:
	python setup.py develop

clean:
	pip uninstall -y radioapi
	rm -rf build dist radioapi.egg-info

enddev:
	python setup.py develop --uninstall

init:
	pip install -r requirements.txt

reqs:
	pip uninstall -y radioapi
	pip freeze > requirements.txt