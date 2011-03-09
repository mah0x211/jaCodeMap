var	strCodeMap = {},
	maps = {
		// half-width
		hNum: /[0-9]/g,
		hAlpha: /[A-Za-z]/g,
		hAlphaUC: /[A-Z]/g,
		hAlphaLC: /[a-z]/g,
		// ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ
		hKana: /[\uff66-\uff9d]/g,
		// ガギグゲゴザジズゼゾダヂヅデドバパビピブプベペボポヴ
		hKanaD: /([\uff73\uff76-\uff84]\uff9e|[\uff8a-\uff8e][\uff9e\uff9f])/g,
		// ()[]{}❲❳⟪⟫｡｢｣､･
		hPunct: /[\(\)\[\]{}❲❳⟪⟫｡｢｣､･]/g,
		//  !"#$%&'*+,-./:;<=>?@\^_`|~¢£¯
		hSym: "[ !\"#$%&'*+,-./:;<=>?@^_`|~¢£¯\\\\]",
		// full-width
		// ０-９ -> \uff10-\uff19
		zNum: /[\uff10-\uff19]/g,
		// Ａ-Ｚａ-ｚ
		zAlpha: /[\uff21-\uff3a\uff41-\uff5a]/g,
		// Ａ-Ｚ -> \uff21-\uff3a
		zAlphaUC: /[\uff21-\uff3a]/g,
		// ａ-ｚ -> \uff41-\uff5a
		zAlphaLC: /[\uff41-\uff5a]/g,
		// ァアィイゥウェエォオカキクケコサシスセソタチッツテトナニヌネノハヒフヘホマミムメモャヤュユョヨラリルレロワヲンー
		zKana: /[\u30a1-\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c3\u30c4\u30c6\u30c8\u30ca-\u30cf\u30d2\u30d5\u30d8\u30db\u30de\u30df\u30e0-\u30ed\u30ef\u30f2\u30f3]/g,
		// ガギグゲゴザジズゼゾダヂヅデドバパビピブプベペボポヴ
		zKanaD: /[\u30ac\u30ae\u30b0\u30b2\u30b4\u30b6\u30b8\u30ba\u30bc\u30be\u30c0\u30c2\u30c5\u30c7\u30c9\u30d0\u30d1\u30d3\u30d4\u30d6\u30d7\u30d9\u30da\u30dc\u30dd\u30f4]/g,
		// japanese punctuation mark
		// 、。《》「」〔〕・ー（）［］｛｝
		zPunct: /[\u3001\u3002\u300a\u300b\u300c\u300d\u3014\u3015\u30fb\u30fc\uff08\uff09\uff3b\uff3d\uff5b\uff5d]/g,
		// 　！＂＃＄％＆＇＊＋，－．／：；＜＝＞？＠＼＾＿｀｜～￠￡￣
		zSym: /[\u3000\uff01-\uff0f\uff1a-\uff20\uff3c\uff3e\uff3f\uff40\uff5c\uff5e\uffe0\uffe1\uffe3]/g,
		autoSym: /[❲❳⟪⟫｡｢｣､･!＂＇，．\\＾｀]/g,
	}


function Init()
{
	var zCode = '０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンーァィゥェォャュョッ、。《》「」〔〕・（）［］｛｝　！＂＃＄％＆＇＊＋，－．／：；＜＝＞？＠＾＿｀｜～￠￡￣＼',
		hCode = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｰｧｨｩｪｫｬｭｮｯ､｡⟪⟫｢｣❲❳･()[]{} !"#$%&\'*+,-./:;<=>?@^_`|~¢£¯\\',
		key,val,i;
	
	for( var i = 0; i < hCode.length; i++ ){
		key = hCode.substr( i, 1 );
		val = zCode.substr( i, 1 );
		strCodeMap[key] = val;
		strCodeMap[val] = key;
	}
	zCode = 'ヴガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ'.split('');
	// ｳﾞｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ
	hCode = 'ｳﾞ,ｶﾞ,ｷﾞ,ｸﾞ,ｹﾞ,ｺﾞ,ｻﾞ,ｼﾞ,ｽﾞ,ｾﾞ,ｿﾞ,ﾀﾞ,ﾁﾞ,ﾂﾞ,ﾃﾞ,ﾄﾞ,ﾊﾞ,ﾋﾞ,ﾌﾞ,ﾍﾞ,ﾎﾞ,ﾊﾟ,ﾋﾟ,ﾌﾟ,ﾍﾟ,ﾎﾟ'.split(',');
	while( zCode.length ){
		key = zCode.pop();
		val = hCode.pop();
		strCodeMap[key] = val;
		strCodeMap[val] = key;
	}
	maps.hSym = new RegExp( maps.hSym, 'g' );
};

Init();

module.exports.auto = function( str )
{
	str = str.replace( maps.zNum, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.zAlpha, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.hKanaD, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.hKana, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.autoSym, function(code){ return strCodeMap[code]; } );
	return str;
};

// MARK: Full-Half
module.exports.f2h = function( str )
{
	str = str.replace( maps.zNum, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.zAlpha, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.zKana, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.zKanaD, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.zPunct, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.zSym, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.f2hNum = function( str )
{
	str = str.replace( maps.zNum, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.f2hAlpha = function( str )
{
	str = str.replace( maps.zAlpha, function(code){ return strCodeMap[code]; } );
	return str;
};
module.exports.f2hAlphaLC = function( str )
{
	str = str.replace( maps.zAlphaLC, function(code){ return strCodeMap[code]; } );
	return str;
};
module.exports.f2hAlphaUC = function( str )
{
	str = str.replace( maps.zAlphaUC, function(code){ return strCodeMap[code]; } );
	return str;
};
module.exports.f2hKana = function( str )
{
	str = str.replace( maps.zKana, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.f2hKanaD = function( str )
{
	str = str.replace( maps.zKanaD, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.f2hKanaAll = function( str )
{
	str = str.replace( maps.zKana, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.zKanaD, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.f2hPunct = function( str )
{
	str = str.replace( maps.zPunct, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.f2hSym = function( str )
{
	str = str.replace( maps.zSym, function(code){ return strCodeMap[code]; } );
	return str;
};

// MARK: Half-Full
module.exports.h2f = function( str )
{
	str = str.replace( maps.hNum, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.hAlpha, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.hKanaD, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.hKana, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.hPunct, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.hSym, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.h2fNum = function( str )
{
	str = str.replace( maps.hNum, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.h2fAlpha = function( str )
{
	str = str.replace( maps.hAlpha, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.h2fAlphaLC = function( str )
{
	str = str.replace( maps.hAlphaLC, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.h2fAlphaUC = function( str )
{
	str = str.replace( maps.hAlphaUC, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.h2fKana = function( str )
{
	str = str.replace( maps.hKana, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.h2fKanaD = function( str )
{
	str = str.replace( maps.hKanaD, function(code){ return strCodeMap[code]; } );
	return str;
};
module.exports.h2fKanaAll = function( str )
{
	str = str.replace( maps.hKanaD, function(code){ return strCodeMap[code]; } );
	str = str.replace( maps.hKana, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.h2fPunct = function( str )
{
	str = str.replace( maps.hPunct, function(code){ return strCodeMap[code]; } );
	return str;
};

module.exports.h2fSym = function( str )
{
	str = str.replace( maps.hSym, function(code){ return strCodeMap[code]; } );
	return str;
};


/*
function Check()
{
	var ary = [],
		// full-width
		zNum = '０１２３４５６７８９',
		zAlphaUC = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
		zAlphaLC = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ',
		zKana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンーァィゥェォャュョッ',
		zKanaD = 'ガギグゲゴザジズゼゾダヂヅデドバパビピブプベペボポヴ',
		// japanese punctuation mark
		zPunct = '、。《》「」〔〕・（）［］｛｝',
		zSym = '　！＂＃＄％＆＇＊＋，－．／：；＜＝＞？＠＼＾＿｀｜～￠￡￣',
		// half-width
		hKana = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
		hPunct = '､｡⟪⟫｢｣❲❳･()[]{}',
		hCode = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
		target = zKana,
		str = '', code = '',
		char;
	
	for( var i = 0; i < target.length; i++ ){
		ary.push( target.substr( i, 1 ).charCodeAt(0) );
		// console.log( hCode.substr( i, 1 ) + ' -> ' + hCode.substr( i, 1 ).charCodeAt(0).toString(16) );
	}
	
	ary = ary.sort( function(l,r){ 	return ( l < r ) ? -1 : ( ( l > r ) ? 1 : 0 ); } );
	while( ary.length ){
		char = ary.shift();
		str += String.fromCharCode( char );
		code += '\\u' + char.toString(16);
		console.log( String.fromCharCode( char ) + ' -> \\u' + char.toString(16) );
	}
	console.log( str );
	console.log( code );
}
Check();
*/
