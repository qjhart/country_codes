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
	for (var c=0; c<res.length; c++) {
	    process.stderr.write(util.format('%d/%d\r',c,res.length));
	    var i=res[c];
	    var country = {code:i.code,country:i.country.label,alpha3:i.alpha3,start:i.start,end:i.end,flag:''};
	    if (i.flag) {
		try {
		    let svg = await request.get(i.flag).set('Accept', 'image/svg+xml');
		    country.flag=svg.body.toString().replace(/\r?\n|\r/g,'').replace(/\s+/g,' ');
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
	jsonexport(country_list,(err,csv) => {
	    if (err) { console.log(err) } ;
	    console.log(csv);
	});
    }).catch(err => console.log(err));



