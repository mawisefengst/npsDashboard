<!--- Parameters --->
<cfparam name="URL.SelectedID" type="numeric" default="0">
<cfparam name="URL.Selection" type="string" default="#application.controlUtilities.getProfileStringSafe(Application.profilePath,'General','DefaultSelection')#">
<cfparam name="URL.SelectedOption" type="string" default="#application.controlUtilities.getProfileStringSafe(Application.profilePath,'General','DefaultOption')#">
<cfparam name="URL.Action" type="string" default="">
<cfparam name="URL.Load" type="numeric" default="1">
<cfparam name="URL.dimIndex" type="numeric" default="2">

<!--- TODO: Cleanup these variables.  I think there are many that arent even used anymore 'calURL' & 'itURL' for example are commented out on lines 166-171  --->
<!--- Dashboard Settings for cfwindows, etc --->
<cfset Session.Control.closeDashboard = False>
<cfset fcdb = hash('controlDashboard')>
<cfset appDefinition = application.controlEventsService.getControlEvent( Session.Control.EventID )>		
<cfset tColor = appDefinition.eventBaseColor>
<cfset intranetWindow = left( hash( createUUID() ), 12 )>
<cfset intranetQueryString = "?fcdb=#fcdb#&vid=#val(session.logincfc.userinfo.userVisitID)#&key=#hash(application.intranetKey)#">
<cfset frameIntranetURL = "index.cfm" & intranetQueryString>
<cfset base = replace(application.configBean.getSetting("urls.intranet"),"?","")&"&winName=#intranetWindow#">
<cfset frameIntranetURL = replace(application.configBean.getSetting("urls.intranet"),"?","") & frameIntranetURL &"&base="&replace(application.configBean.getSetting("urls.intranet"),"?","")&"&winName=#intranetWindow#">
<cfset intranetAppend = "?fcdb=#fcdb#&vid=#val(session.logincfc.userinfo.userVisitID)#&key=#hash(application.intranetKey)#&fromDB=true&base=#replace(application.configBean.getSetting("urls.intranet"),'?','')#">
<cfset wholeIntranet = replace( frameIntranetURL, "fcdb=", "x=" )>
<cfset version = application.version>

<cfset intranetLink_contact = replace(application.configBean.getSetting("urls.intranet"),"?","") & replace( ("contact.cfm" & intranetQueryString), "fcdb=", "x=" ) & "&base="&replace(application.configBean.getSetting("urls.intranet"),"?","")&"&winName=#intranetWindow#">

<cfset intranetLink_devTix = replace(application.configBean.getSetting("urls.intranet"),"?","") & replace( ("it_tickets/public/index.cfm" & intranetQueryString), "fcdb=", "x=" ) &"&base="&replace(application.configBean.getSetting("urls.intranet"),"?","")&"&winName=#intranetWindow#">

<cfset intranetLink_opsTix = replace(application.configBean.getSetting("urls.intranet"),"?","") & replace( ("ops_tickets/" & intranetQueryString), "fcdb=", "x=" ) &"&base="&replace(application.configBean.getSetting("urls.intranet"),"?","")&"&winName=#intranetWindow#">

<cfset intranetLink_lockout = replace(application.configBean.getSetting("urls.intranet"),"?","") & replace( ("utilities/lockouts.cfm" & intranetQueryString), "fcdb=", "x=" ) &"&base="&replace(application.configBean.getSetting("urls.intranet"),"?","")&"&winName=#intranetWindow#">

<cfset linkDivider = "&nbsp;|&nbsp;">

<cfoutput>
	<!DOCTYPE html>
	<html>
		<head>
			<title>#request.displayName#</title>
			<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
			<META HTTP-EQUIV="Expires" CONTENT="-1">
			<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
			<META HTTP-EQUIV="Refresh" CONTENT="540;URL=#cgi.SCRIPT_NAME#?load=#url.load+1#&#session.URLToken#">
			<link href="control.css" rel="stylesheet" type="text/css">
			<!---
			<link href="css/ux_menu.css" rel="stylesheet" type="text/css">
			--->
			<link rel="shortcut icon" href="#application.configBean.getSetting('urls.base')#images/favicon.ico" type="image/x-icon">
			<link href="/control3/css/bootstrap_min.css" rel="stylesheet" type="text/css">
			
			<!--- Stan on 1/9/2009 ---><!--- accessiong _urlToken later in controlfunctions.js to try to get around session loss error --->
			<cfif StructKeyExists(session,"urltoken")>
				<script language="javascript" type="text/javascript">
					_urlToken = '#session.urlToken#';
				</script>
				<cfset urls = StructNew()>
			</cfif>
			<!--- NOTE: See inc_javascript.cfm BEFORE adding any new Javascript libs, cfajaximport's or cfajaxproxy's --->
			<cfinclude template="inc_javascript.cfm"/>
			<!---<script type="text/javascript">
				function dbRefreshCancel(){
					clearTimeout( _refreshTimer );
					_refreshTimer = setTimeout( "location.reload(true);", _refreshInt );
				}
			</script>--->
			<style>
				a.dashboardLink{font-size:12px;font-weight:bold;}
				a.dashboardLink:hover{font-size:12px;font-weight:bold;text-decoration:none;}
				div.controlBodyBox{max-width: 1200px;margin:0 auto;}
			</style>
		</head>
		
		<body>
			<div id="sessionMessage" name="sessionMessage" style="display:none;"></div>
			<div class="ControlTitle" id="machine">
				#request.displayName# 
			</div>
			<div class="ControlBreadCrumbBanner"><div class="ControlMenuBar">#dateFormat(now())#&nbsp;|&nbsp;#request.realIP#&nbsp;|&nbsp;(Load: #URL.load#)</div></div>
			<div id="contentFrame" class="controlBodyBox">
				<div style="font-size:12px;padding-bottom:4px;padding-top:4px;border-bottom:4px solid ###tColor#;margin:0px;">
					<a href="index.cfm?closeDashboard=true"><strong>Go to Control</strong></a>
					#linkDivider#
					<a href="#cgi.script_name#?#cgi.QUERY_STRING#" id="dbLink" style="color:black;">Internal Dashboard</a>
					#linkDivider#
					<a href="#wholeIntranet#" target="SSSI_Intranet" id="intraLink">Intranet Menu</a>
					#linkDivider#
					<a href="#intranetLink_contact#" target="SSSI_Intranet" id="intraLink">Contact List</a>
					#linkDivider#
					<a href="#intranetLink_opsTix#" target="SSSI_Intranet" id="intraLink">Ops Tickets</a>
					#linkDivider#
					<a href="#intranetLink_devTix#" target="SSSI_Intranet" id="intraLink">Dev Tickets</a>
					#linkDivider#
					<a href="#intranetLink_lockout#" target="SSSI_Intranet" id="intraLink">Lockout Correction Utility</a>
					#linkDivider#
					<a href="logout.cfm?closeDashboard=true">Logout</a>
					<!--- [2017-09-20 FJA] Barb asking me to remove this link --->			
					<!--- #linkDivider#
					<a href="javascript:location.reload();">Reload Page</a> --->
				</div>
				
				<!--<div class="dashboardPage">
				<div>	
					<iframe style="width:100%;height:800px;border:0px solid ###tColor#;" frameborder="0" name="SSSI_Intranet" src="dashboard2.cfm"></iframe>
				</div>-->

				<!--- Container --->
				<div id="dashboardContainer" style="position:relative;">
					<!--- Left Col --->
					<cfset leftpos = 4>
					<body>
								<!--- Left Col --->
								<cfset leftpos = 4>
								
								<!--- <div style="position:absolute;top:4px;left:#leftpos#px;width:246;">
								<cf_customPod height="180" width="226" ieheight="203" title="Intranet">
									<iframe style="width:100%;height:100%;border:0px solid ###tColor#;" frameborder="0" name="SSSI_Intranet" src="#frameIntranetURL#"></iframe>
									<span style="color:red;">The Intranet is now only accessible to internal users. Contact Dev if you are experiencing any problems.</span>
								</cf_customPod>
								</div> --->
								
								<!--- <div style="position:absolute;top:4px;left:234px;width:150px;">
								<cf_customPod height="180" width="120" ieheight="203" title="Program Tracker">
									<cfinclude template="Views\programTracker.cfm"> 
								</cf_customPod>
								</div> --->
								
								<div style="position:absolute;top:4px;left:#leftpos#px;width:400px;">
									<cf_customPod height="680" ieheight="700" width="350px" title="Event Selection">
										<cfinclude template="dashboardEventSelector.cfm">
									</cf_customPod>
								</div>
								
								<!--- End Left Col --->
									
								
								<!--- Right Col NPS --->	
								<cfset leftpos = 411>
								<cfset topposCalendar = 4>
								<cfset midColPodWidth = 780>

								<div style="position:absolute;top:#topposCalendar#px;left:#leftpos#px;width:#midColPodWidth#px;">
									<cf_customPod height="265" width="#midColPodWidth#" ieheight="288" title="NPS">
										<!---<cfinclude template="/intranet/utilities/companyStatus.cfm">--->
										

										<div id="npsAverage"></div>

										<script src="http://localhost:3000/socket.io/socket.io.js"></script>
										<script>
										  var socket = io.connect('http://localhost:3000');
										  socket.on('news', function (data) {
										    	//console.log(data);
										   	 	document.getElementById("npsAverage").innerHTML = data.data;
										  });

										  socket.on('news2', function (data) {
											    console.log(data);
											    document.getElementById("npsAverage").innerHTML = data.data;
											    /*socket.emit('my other event', { 
											    	data : 'message from browser' 
											    });*/
										  });

										  

					
										</script>

									</cf_customPod>
								</div>
								
								 <!---
								 <div style="position:absolute;top:#topposCalendar#px;left:#leftpos#px;width:#midColPodWidth#px;">
									<cf_customPod height="265" width="#midColPodWidth#" ieheight="288" title="Company Status">
										<cfinclude template="/intranet/utilities/companyStatus.cfm">
									</cf_customPod>
								</div>
								--->
								
								<!--- Right Col --->	
								<cfset leftpos = 411>
								<cfset topposCalendar = 306>
								<cfset midColPodWidth = 780>	

								<div style="position:absolute;top:#topposCalendar#px;left:#leftpos#px;width:#midColPodWidth#px;">
									<cf_customPod height="378" ieheight="378" width="#midColPodWidth#" title="Calendar">
										<cfset application.dsn_sssi = "sssData">
										<cfinclude template="/intranet/tasks/calendar.cfm">
									</cf_customPod>
									 <!--<iframe src="https://www.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=sportssystems.com_6mpsan1chu19bl50i7rqh252p8%40group.calendar.google.com&amp;color=%23B1440E&amp;src=sportssystems.com_rh54gn8ttdd9qrkukjukus084c%40group.calendar.google.com&amp;color=%23182C57&amp;src=sportssystems.com_psnc76rfn0vj4tous51vlupfj0%40group.calendar.google.com&amp;color=%238D6F47&amp;src=sportssystems.com_ju2bngr8amc64lhsn2t5pf8o8k%40group.calendar.google.com&amp;color=%2329527A&amp;ctz=America%2FNew_York" 
										style=" border-width:0 " width="660" height="600" frameborder="0" scrolling="no"></iframe> -->
								</div>
								

								<!--- End Middle Col --->
									
								<!--- Right Col --->	
								<cfset leftpos = 4>
								<cfset toppos = 725>
								
								<div style="position:absolute;top:#toppos#px;left:#leftpos#px;width:100%;">
									<cf_customPod height="1000" ieheight="700" width="100%" title="IT Release Notes">
										<!---<iframe style="width:100%;height:100%;border:0px solid ###tColor#;" frameborder="0" name="SSSI_ITReleaseNotes" src="/intranet/release%20notes/index.cfm#intranetAppend#"></iframe>--->
										<cfinclude template="/intranet/release notes/index.cfm">
									</cf_customPod>
								</div>
								
				<!--- End Right Col --->
				</div>

			</div>
		</body>
	</html>
</cfoutput>		
