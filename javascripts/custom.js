var $ = require('jquery');
// require other libraries after this line
require("whatwg-fetch");

var fetching = fetch("/javascripts/chippy.json")
	.then(function(res){
		return res.json();
	});

$(document).ready(function() {
	fetching.then(function(grammar){
		var chippyGen = new RiGrammar(grammar);
		var startRule = "<menu-items> ";
		// 8 - 13 words per sentence
		var completeRule = genSentence(Math.floor(Math.random() * 5 + 8), startRule);
		chippyGen.addRule("<sentence>", completeRule);

		$("#page-content #generate #btn").prop("disabled", false);

		$("#page-content #generate").submit(function(e){
			e.preventDefault();

			var para = genParagraph(parseInt($("#page-content #paragraph-number").val()), parseInt($("#page-content #sentence-number").val()));
			$("#page-content .chippy-ipsum").html(para);

			return false;
		});

		function genSentence(words, rule){
			var sentence = "";
			for(var i=0; i<words; i++){
				sentence += rule;
			}
			return sentence;
		}

		function genParagraph(paragraphNo, sentenceNo){
			var paragraph = "";

			for(var i=0; i<paragraphNo; i++){
				paragraph += "<p>";

				if(i === 0){
					paragraph += "Chippy ipsum dolor amet ";
				}

				for(var j=0; j<sentenceNo; j++){
					var sentence = chippyGen.expandFrom("<sentence>").replace(/^,/, "").replace(/\s\s+/g, " ").replace(/^\s/, "");
					if(!(i === 0 && j === 0)){
						sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1, sentence.length-1);
					}
					sentence += ". ";
					sentence = sentence.replace(/\s,/g, ",").replace(/,+/g, ",").replace(/,\./g, ".").replace(/\s\./g, ".");
					paragraph += sentence;
				}
				paragraph += "</p>";
			}

			return paragraph;
		}
	});
});
