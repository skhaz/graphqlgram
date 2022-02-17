To run, just run

```bash
docker-compose up
```

Wait some time while docker is pulling the image of mongodb and building the container.

After this step, open the _GraphQL Playground_ at: http://localhost:3000/graphql

First of all, create an user:

```graphql
mutation {
  createUser(
    data: {
      email: "user@example.com"
      password: "secret"
      name: "User"
      image: "https://github.com/user.png"
    }
  ) {
    email
    name
    image
  }
}
```

Then, do the logIn:

```graphql
mutation {
  logIn(email: "user@example.com", password: "secret")
}
```

You should receive a token as result of the call, grab the token and on the bottom of the playgraoud there is a button named "HTTP Headers", paste the token as the following

```json
{
  "Authorization": "your token here"
}
```

With the HTTP headers set, try to create a new _Post_:

```graphql
mutation {
  createPost(
    data: {
      image: "https://bucket/image.jpg"
      title: "Some image"
      description: "Some description"
    }
  ) {
    image
    title
    description
    author
  }
}
```

Listing all _Posts_ is simple, just do:

```grapqhl
query {
  allPosts {
    id,
    image,
    title,
    description,
    author
  }
}
```

> Remember, you have to set the HTTP headers with the token in order to see the posts.

Updating a post that user owns:

```graphql
mutation {
  updatePost(
    id: "post-id"
    data: {
      image: "https://bucket/image2.jpg"
      title: "Updated title"
      description: "Updated description"
    }
  ) {
    id
    image
    title
    description
    author
  }
}
```

Deleting a post:

``` graphql
mutation {
  deletePost(id: "post-id")
}
```