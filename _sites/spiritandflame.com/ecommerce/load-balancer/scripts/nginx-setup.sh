#!/bin/bash
cat <<EOF > /etc/nginx.conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {

	upstream store_portal {
		server storefront:8000;
	}

    upstream admin_portal {
		server admin:9000;
	}

    upstream minio_portal {
		server minio:9002;
	}

    upstream search_portal {
		server search:7700;
	}

    server {

        listen 80;

        server_name backend, api.spiritandflame.com;

        location / {
            proxy_pass http://admin_portal/;
        }
    }

    server {

        listen 80;

        server_name admin, admin.spiritandflame.com;

        location / {
            proxy_pass http://admin_portal/app/;
        }
    }

    server {

        listen 80;

        server_name search, search.spiritandflame.com;

        location / {
            proxy_pass http://search_portal/;
        }
    }

    server {

        listen 80;

        server_name minio, s3.spiritandflame.com;

        location / {
            proxy_pass http://minio_portal/;
        }
    }

	server {

        listen 80;

        server_name localhost, host.docker.internal, www.spiritandflame.com, spiritandflame.com;

        location / {
            proxy_pass http://store_portal/;
        }

    }

}
EOF