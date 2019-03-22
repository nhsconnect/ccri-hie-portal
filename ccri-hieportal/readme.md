

docker build . -t ccri-hieportal

docker tag ccri-hieportal thorlogic/ccri-hieportal

docker push thorlogic/ccri-hieportal



https://cloud.google.com/kubernetes-engine/docs/how-to/stateless-apps
tutorial https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app

docker build . -t gcr.io/cc-smart/ccri-hieportal
docker push gcr.io/cc-smart/ccri-hieportal

Command for retrieving certs from ODS

openssl s_client -showcerts -connect server.edu:443 </dev/null 2>/dev/null|openssl x509 -outform PEM >mycertfile.pem

Convert to der

openssl x509 -outform der -in mycertfile.pem -out odscertificate.der

Import into keystore.jks

keytool -import -alias ods -keystore keystore.jks -file odscertificate.der
