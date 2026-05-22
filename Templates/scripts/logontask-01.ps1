Start-Transcript -Path C:\WindowsAzure\Logs\LogonTask.txt -Append

$commonscriptpath = "C:\Packages\Plugins\Microsoft.Compute.CustomScriptExtension\1.10.*\Downloads\0\cloudlabs-common\cloudlabs-windows-functions.ps1"
. $commonscriptpath

Unregister-ScheduledTask -TaskName "Setup" -Confirm:$false
Stop-Transcript