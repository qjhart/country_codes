#! /usr/bin/env node
'use strict'

const util = require('util');
var fs=require('fs');
var request = require('superagent');
var wdk=require('wikidata-sdk');
var jsonexport=require('jsonexport');

var q=fs.readFileSync('country_codes.sparql','utf8')

var url = wdk.sparqlQuery(q);

var get_countries = async function() {
    let country_list=[];
    try {
	let res = await request.get(url);
	res = wdk.simplifySparqlResults(res.body);
	for (var c=0; c<1; c++) {
	    process.stdout.write(util.format('%d/%d\r',c,res.length));
	    var i=res[c];
	    var country = {code:i.code,country:i.country.label,alpha3:i.alpha3,flag:''};
	    if (i.flag) {
		try {
		    let svg = await request.get(i.flag).set('Accept', 'image/svg+xml');
		    country.flag=svg.body;
		} catch (err) {
		    console.log('Flag request failed:'+err);
		}
	    }
	    country_list.push(country);
	}
    } catch (err)  {
	console.log(err);
    }
    return country_list;
}

get_countries()
    .then(country_list=>{
	console.log(JSON.stringify(country_list));
	jsonexport(country_list,(err,csv) => {
	    if (err) { console.log(err) } ;
	    console.log(csv);
	});
    }).catch(err => console.log(err));



/*
 request.get(url)
    .then( res => wdk.simplifySparqlResults(res.body))
    .then((cc) => {
	cc.forEach( i => {
	    var country = {code:i.code,country:i.country.label,alpha3:i.alpha3,flag:null};
	    if (i.flag) {
		request.get(i.flag)
		    .then(flag => {
			country.flag=flag.res;
			country_list.push(country);
		    }).catch(err => {console.error(err); country_list.push(country)});
	    } else {
		country_list.push(country);
	    }
	})	
	jsonexport(country_list,(err,csv) => {
	    if (err) return console.error(err);
	    console.log(csv);
	});
    }).catch(err => console.error(err))
*/		      
