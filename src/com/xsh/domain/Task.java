package com.xsh.domain;

import java.util.Date;

/**
 * Task entity. @author MyEclipse Persistence Tools
 */

public class Task implements java.io.Serializable {

	// Fields

	private Integer id;
	private String taskName;
	private Date taskTime;

	// Constructors

	/** default constructor */
	public Task() {
	}

	/** full constructor */
	public Task(String taskName, Date taskTime) {
		this.taskName = taskName;
		this.taskTime = taskTime;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTaskName() {
		return this.taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public Date getTaskTime() {
		return this.taskTime;
	}

	public void setTaskTime(Date taskTime) {
		this.taskTime = taskTime;
	}

}