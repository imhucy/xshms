package com.xsh.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class EnCodingFilter implements Filter {

	public void destroy() {}
	public void init(FilterConfig arg0) throws ServletException {}
	
	
	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {
		// 设置编码方式
		req.setCharacterEncoding("utf-8");
	}

	

}
