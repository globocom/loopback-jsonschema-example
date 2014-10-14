help:
	@echo '    setup ................... sets up project'
	@echo '    run ..................... runs project'
	@echo '    post_schema ............. post json schema'
	@echo '    create_person ........... creates a person'

setup:
	rm -rf node_modules
	npm install

run:
	node app.js

post_schema:
	curl -i -XPOST -H "Content-Type: application/json" http://localhost:5000/api/item-schemas -T json-schemas/person_schema.json

create_person:
	curl -i -XPOST -H "Content-Type: application/json" http://localhost:5000/api/people -T json-schemas/person.json
