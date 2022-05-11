/*
Parse Get URL parameters and returns a key value pair array with urlencode decoded.
*/
function getURLParamsArray()
{
  var parts = location.search.substring(1).split('&');
  var out = [];
  for( var i = 0; i < parts.length; ++i )
  {
    var keypair = parts[i].split('=');
    if( keypair.length > 1 )
    {
      out[ decodeURIComponent( keypair[0] ) ] = decodeURIComponent( keypair[1].split('+').join(' ') );
    }
    else
    {
      out[ decodeURIComponent( keypair[0] ) ] = null;
    }
  }
  return out;
}

/*
Accepts a key value pair array and generates an iCal text.
*/
function makeCalText(a)
{
  s1 = "BEGIN:VCALENDAR\n";
  s1 += "VERSION:2.0\n";
  s1 += "PRODID:-//rm.vg//kk v1.0//EN\n";

  s1 += "BEGIN:VEVENT\n";
  s1 += "DTSTART;TZID=America/New_York:" + a['DTSTART'] + "\n";
  s1 += "DTEND;TZID=America/New_York:" + a['DTEND'] + "\n";
  s1 += "SUMMARY:" + a['SUMMARY'].split(',').join("\\,").split(';').join("\\;") + "\n";
  s1 += "LOCATION:" + a['LOCATION'].split(',').join("\\,").split(';').join("\\;") + "\n";
  s1 += "END:VEVENT\n";

  s1 += "END:VCALENDAR\n";
  return s1;
}

/*
  makes a file as a data uri, then opens it.
*/
function mk_file(a)
{
  var uri = "data:text/calendar," + makeCalText(a);
  console.log(uri);
  //window.open(uri);
  var link = document.createElement('a');
  link.download = "cal.ics";
  link.href = uri;
  link.click();
}

/*
$$$ UI functions
*/
function dtstart_mk()
{
  var o = '';
  o += document.getElementById('dtstart_year').value;
  o += document.getElementById('dtstart_month').value;
  o += document.getElementById('dtstart_day').value;
  o += "T";
  o += document.getElementById('dtstart_hour').value;
  o += document.getElementById('dtstart_minute').value;
  o += document.getElementById('dtstart_second').value;
  document.getElementById('dtstart').value = o;
}
function dtend_mk()
{
  var o = '';
  o += document.getElementById('dtend_year').value;
  o += document.getElementById('dtend_month').value;
  o += document.getElementById('dtend_day').value;
  o += "T";
  o += document.getElementById('dtend_hour').value;
  o += document.getElementById('dtend_minute').value;
  o += document.getElementById('dtend_second').value;
  document.getElementById('dtend').value = o;
}

/*
$$$ Main functions
*/
var a = getURLParamsArray();
if( a['DTSTART'] != null && a['DTEND'] != null && a['SUMMARY'] != null )
{
  //document.body.innerHTML += "<pre>" + makeCalText(a) + "</pre>";
  mk_file(a);
}

/*
Set the GUI parameters if they are present as form entries and URLs.
*/
if( document.getElementById('LOCATION') != null && a['LOCATION'] != null )
{
  console.log(1);
  document.getElementById('LOCATION').value = a['LOCATION'];
}
if( document.getElementById('SUMMARY') != null && a['SUMMARY'] != null )
{
  console.log(2);
  document.getElementById('SUMMARY').value = a['SUMMARY'];
}
if( document.getElementById('dtstart') != null && a['DTSTART'] != null )
{
  document.getElementById('dtstart').value = a['DTSTART'];
}
if( document.getElementById('dtend') != null && a['DTEND'] != null )
{
  document.getElementById('dtend').value = a['DTEND'];
}
