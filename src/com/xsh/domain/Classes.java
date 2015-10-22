package com.xsh.domain;

import java.util.HashSet;
import java.util.Set;

/**
 * Classes entity. @author MyEclipse Persistence Tools
 */

public class Classes implements java.io.Serializable {

	// Fields

	private Integer id;
	private String major;
	private Integer classNum;
	private Set students = new HashSet(0);

	// Constructors

	/** default constructor */
	public Classes() {
	}

	/** minimal constructor */
	public Classes(String major, Integer classNum) {
		this.major = major;
		this.classNum = classNum;
	}

	/** full constructor */
	public Classes(String major, Integer classNum, Set students) {
		this.major = major;
		this.classNum = classNum;
		this.students = students;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMajor() {
		return this.major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public Integer getClassNum() {
		return this.classNum;
	}

	public void setClassNum(Integer classNum) {
		this.classNum = classNum;
	}

	public Set getStudents() {
		return this.students;
	}

	public void setStudents(Set students) {
		this.students = students;
	}

}