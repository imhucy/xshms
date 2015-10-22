package com.xsh.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Example;

import com.xsh.util.HibernateUtil;

public class GenericHibernateDAO<T , ID extends Serializable> {
	private Class<T> persistentClass;

	public GenericHibernateDAO(Class<T> persistentClass) {
		this.persistentClass = persistentClass;
	}
	
	public Class<T> getPersistentClass(){
		return persistentClass;
	}
	
	protected Session getSession(){
		return HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public List<T> getByHsql(String hsql){
		Query query = getSession().createQuery(hsql);
		return query.list();
	}
	
	protected List<T> getByCriteria(Criterion... criterion){
		Criteria crit = getSession().createCriteria(getPersistentClass());
		for(Criterion c : criterion) {
			crit.add(c);
		}
		return crit.list();
	}
	
	public T getById(ID id){
		T entity = (T) getSession().get(getPersistentClass(), id);
		HibernateUtil.commitAndBeginTransaction();
		return entity;
	}
	
	public List<T> getAll(){
		return getByCriteria();
	}
	
	public List<T> getByExample(T exampleInstance){
		return getByCriteria(Example.create(exampleInstance));
	}
	
	public T makePersistent(T entity) {
		getSession().saveOrUpdate(entity);
		return entity;
	}
	
	public void makeTransient(T entity){
		getSession().delete(entity);
	}
}










