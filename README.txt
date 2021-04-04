The project consists of three images:
- website
- server (proxy server between the site and the react-admin)
- react-admin(contains Json server)

The "docker_compose_file folder" contains an .yml file that can be used to run all images.

Issue:
- the server terminates the connection to the Json server while sending data there.
  If you start the server on a local machine (I used VisualCode) and the other two images are using a docker, the connection is not broken.

I look forward to your comments.
I would like to solve the connection problem.
