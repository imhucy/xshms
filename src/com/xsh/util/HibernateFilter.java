package com.xsh.util;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;

public class HibernateFilter implements Filter {

	
	/**
	 * 过滤器的主要方法
	 * 用于实现Hibernate事务的开始和提交，并设置request编码
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		request.setCharacterEncoding("utf-8");
		
		SessionFactory sf = HibernateUtil.getSessionFactory();
		
		try {
			sf.getCurrentSession().beginTransaction();
			
			chain.doFilter(request, response);
			
			sf.getCurrentSession().getTransaction().commit();
		} catch (Throwable ex) {
			ex.printStackTrace();
			try{
				sf.getCurrentSession().getTransaction().rollback();
			}
			catch ( Throwable rbEx ){
				rbEx.printStackTrace();
			}
			
			throw new ServletException(ex);
		}
	}
	/**
	 * 过滤器的初始化方法
	 * 可以读取配置文件中设置的配置参数
	 */
	public void init(FilterConfig filterConfig) throws ServletException {}
	/**
	 * 过滤器销毁方法
	 * 用于释放过滤器所申请的资源
	 */
	public void destroy() {}
}
