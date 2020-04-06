define({ "api": [
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete a single",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "HTTP/1.1 200 OK\n[\n  3\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "name": "DeleteUsersId"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get all",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"avatar\": null,\n    \"name\": \"John Doe\",\n    \"email\": \"john.doe@email.com\",\n    \"password\": \"123\",\n    \"birthday\": \"1990-01-01\",\n    \"location\": \"California\",\n    \"description\": \"Hi, I'm John Doe! Nice to meet you\",\n    \"created_at\": \"2020-04-03 14:00:00\",\n    \"updated_at\": \"2020-04-03 14:00:00\",\n  },\n  {\n    \"id\": 2,\n    \"avatar\": null,\n    \"name\": \"Monty Python\",\n    \"email\": \"monty.python@email.com\",\n    \"password\": \"123\",\n    \"birthday\": \"1994-01-01\",\n    \"location\": \"Texas\",\n    \"description\": \"Hello there\",\n    \"created_at\": \"2020-04-04 10:00:00\",\n    \"updated_at\": \"2020-04-04 10:00:00\",\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "name": "GetUsers"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get a single",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 3,\n  \"avatar\": null,\n  \"name\": \"Karen Eliot\",\n  \"email\": \"karen.eliot@email.com\",\n  \"password\": \"123\",\n  \"birthday\": \"1996-01-01\",\n  \"location\": \"NY\",\n  \"description\": null,\n  \"created_at\": \"2020-04-06 18:00:00\",\n  \"updated_at\": \"2020-04-06 18:00:00\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "name": "GetUsersId"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Insert multiple",
    "group": "User",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "json",
            "optional": false,
            "field": "User",
            "description": "<p>User fields (not all fields are mandatory)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example",
          "content": "{\n  \"name\": \"Karen Eliot\",\n  \"email\": \"karen.eliot@email.com\",\n  \"password\": \"123\",\n  \"birthday\": \"1996-01-01\",\n  \"location\": \"NY\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 3,\n  \"avatar\": null,\n  \"name\": \"Karen Eliot\",\n  \"email\": \"karen.eliot@email.com\",\n  \"password\": \"123\",\n  \"birthday\": \"1996-01-01\",\n  \"location\": \"NY\",\n  \"description\": null,\n  \"created_at\": \"2020-04-06 18:00:00\",\n  \"updated_at\": \"2020-04-06 18:00:00\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "name": "PostUsers"
  },
  {
    "type": "post",
    "url": "/users/:id",
    "title": "Update a single",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "json",
            "optional": false,
            "field": "User",
            "description": "<p>User fields (not all fields are mandatory)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example",
          "content": "{\n  \"name\": \"Netochka Nezvanova\",\n  \"email\": \"netochka.nezvanova@email.com\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 3,\n  \"avatar\": null,\n  \"name\": \"Netochka Nezvanova\",\n  \"email\": \"netochka.nezvanova@email.com\",\n  \"password\": \"123\",\n  \"birthday\": \"1996-01-01\",\n  \"location\": \"NY\",\n  \"description\": null,\n  \"created_at\": \"2020-04-06 18:00:00\",\n  \"updated_at\": \"2020-04-06 18:00:00\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "name": "PostUsersId"
  }
] });
