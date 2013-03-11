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
        port : 3000, // used for mock
        url : "http://localhost:3000/api/transmission",
        apiKey : "c6b4d463-5025-439f-86a2-74ea8f2f0052",
        widgets : {
            "bugs trend" : {
                active : true,
                reference : "5110d3fd68d9a27a0300truc",
                dir : "./widgets/redmine-issues-trend",
                period : {count : 30, unit : 'minutes'}
            },
            "issues count" : {
                active : true,
                reference : "5110d1c768d9a27a0300truc",
                dir : "./widgets/redmine-issues-count",
                period : {count : 5, unit : 'minutes'}
            }
        }
	}
}
