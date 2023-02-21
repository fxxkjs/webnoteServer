<p>//http自动转https</p>
<pre><div class="hljs"><code class="lang-js">rewrite ^(.*)$ https:<span class="hljs-comment">//$host$1 permanent;</span>
</code></div></pre>
<p>//检查443端口是否开放后</p>
<pre><div class="hljs"><code class="lang-js">server {
     listen <span class="hljs-number">443</span> ssl; 
     server_name www.webnote.fun; #域名
     root html;
     index index.html index.htm;
     ssl_certificate /smile/ssl/webnote.pem;	#证书
     ssl_certificate_key /smile/ssl/webnote.key;	#密钥
     ssl_session_timeout <span class="hljs-number">5</span>m;
     ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; 
     ssl_protocols TLSv1 TLSv1<span class="hljs-number">.1</span> TLSv1<span class="hljs-number">.2</span>; 
     ssl_prefer_server_ciphers on;
     location / {
     root html;  #站点目录
     index index.html index.htm;
                }
}
</code></div></pre>