# Video Directory
$sourceDir = "C:/Users/kderb/Videos"
# Output Location
$outDir = "C:/Users/kderb/Documents/Git/ConflictingTheories/Sites/ConflictingTheories/media/audio"
# Extract Audio and Copy to Git Repo
$filePath = Get-ChildItem -Path $sourceDir | Where-Object {! $_.PSIsContainer}
ForEach($i in $filePath){
    Write-Output $i.FullName
    ffmpeg -y -i $i.FullName -vn -ar 44100 -q:a 2 "$outDir/latest.mp3" 
    Move-Item $i.FullName "$($sourceDir)/exported/$($i.Name)"
}
