package com.xsh.util;

import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
	private static Configuration config;
	private static SessionFactory factory;
	
	static {
		try {
			config = new Configuration();
			config.configure();
			factory = config.buildSessionFactory();
		} catch (HibernateException e) {
			e.printStackTrace();
		}
	}
	
	public static Configuration getConfig(){
		return config;
	}
	
	public static SessionFactory getSessionFactory(){
		SessionFactory sf = factory;
		if ( sf == null ){
			throw new IllegalStateException("SessionFactory 不可访问");
		}
		return sf;
	}
	
	public static void shutdown(){
		getSessionFactory().close();
		
		config = null;
		factory = null;
	}
	
	public static void commitAndBeginTransaction(){
		factory.getCurrentSession().getTransaction().commit();
		factory.getCurrentSession().beginTransaction();
	}
}
