package com.xsh.domain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Term entity. @author MyEclipse Persistence Tools
 */

public class Term implements java.io.Serializable {

	// Fields

	private Integer id;
	private String content;
	private Date firstweek;
	private Integer curweek;
	private Set attendances = new HashSet(0);

	// Constructors

	/** default constructor */
	public Term() {
	}

	/** minimal constructor */
	public Term(String content, Date firstweek) {
		this.content = content;
		this.firstweek = firstweek;
	}

	/** full constructor */
	public Term(String content, Date firstweek, Integer curweek, Set attendances) {
		this.content = content;
		this.firstweek = firstweek;
		this.curweek = curweek;
		this.attendances = attendances;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getFirstweek() {
		return this.firstweek;
	}

	public void setFirstweek(Date firstweek) {
		this.firstweek = firstweek;
	}

	public Integer getCurweek() {
		return this.curweek;
	}

	public void setCurweek(Integer curweek) {
		this.curweek = curweek;
	}

	public Set getAttendances() {
		return this.attendances;
	}

	public void setAttendances(Set attendances) {
		this.attendances = attendances;
	}

}