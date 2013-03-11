module.exports = {
	redmine : {
		host : "redmine.stuff.com",
		apiKey : "sha1key0jdklzd0nsdc542sdsdc"
	},
	viadeo : {
    	url : {
        	main : { prod : "http://www.sample.com/" },
        	acqui : { prod : "http://www.othersample..com" }
    	}
	},
	dashku : {
    		url : "http://localhost:3000/api/transmission",
    		apiKey : "c6b4d463-5025-439f-86a2-74ea8f2f0052",
    		widgetsRefs : {
            		"bugs trend"                        : "sha1key5110d3fd68d900001f",
            		"issues count"                      : "sha1key5110d1c768d9000015",
            		"high priority issues count"        : "sha1key511116b868d30001c2",
            		"main webapp production status"     : "sha1key5110ed3568d9000155",
            		"acqui webapp production status"    : "sha1key5111002a68d9000184"
        	}
	}
}
