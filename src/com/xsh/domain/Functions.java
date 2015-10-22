package com.xsh.domain;

import java.util.HashSet;
import java.util.Set;

/**
 * Functions entity. @author MyEclipse Persistence Tools
 */

public class Functions implements java.io.Serializable {

	// Fields

	private Integer id;
	private String funcName;
	private String funcUrl;
	private Set roleFunctionses = new HashSet(0);

	// Constructors

	/** default constructor */
	public Functions() {
	}

	/** minimal constructor */
	public Functions(String funcName, String funcUrl) {
		this.funcName = funcName;
		this.funcUrl = funcUrl;
	}

	/** full constructor */
	public Functions(String funcName, String funcUrl, Set roleFunctionses) {
		this.funcName = funcName;
		this.funcUrl = funcUrl;
		this.roleFunctionses = roleFunctionses;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFuncName() {
		return this.funcName;
	}

	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}

	public String getFuncUrl() {
		return this.funcUrl;
	}

	public void setFuncUrl(String funcUrl) {
		this.funcUrl = funcUrl;
	}

	public Set getRoleFunctionses() {
		return this.roleFunctionses;
	}

	public void setRoleFunctionses(Set roleFunctionses) {
		this.roleFunctionses = roleFunctionses;
	}

}