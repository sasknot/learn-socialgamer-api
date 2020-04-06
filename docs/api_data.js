define({ "api": [
  {
    "type": "get",
    "url": "/users",
    "title": "Get all users information",
    "name": "GetUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Users",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"name\": \"John Doe\",\n    \"email\": \"john.doe@email.com\"\n  },\n  {\n    \"id\": 2,\n    \"name\": \"John Doe 2\",\n    \"email\": \"john.doe2@email.com\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
