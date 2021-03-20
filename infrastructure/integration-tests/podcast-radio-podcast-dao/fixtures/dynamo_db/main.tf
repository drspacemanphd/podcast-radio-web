resource "aws_dynamodb_table_item" "podcast_one" {
  table_name    = "PODCAST"
  hash_key      = "GUID"

  item = <<ITEM
{
  "GUID": {"S": "12345"},
  "TITLE": {"S": "The Daily"},
  "AUTHOR": {"S": "The New York Times"},
  "DESCRIPTION": {"S": "The Daily Description"},
  "IMAGE": {"S": "https://is3-ssl.mzstatic.com/image/thumb/Podcasts114/v4/93/cf/99/93cf9960-fff3-205e-6655-72c03ddeccb2/mza_10545582232493904175.jpeg/600x600bb.jpg"}
}
ITEM
}

resource "aws_dynamodb_table_item" "podcast_two" {
  table_name    = "PODCAST"
  hash_key      = "GUID"

  item = <<ITEM
{
  "GUID": {"S": "23456"},
  "TITLE": {"S": "Pod Save America"},
  "AUTHOR": {"S": "Crooked Media"},
  "DESCRIPTION": {"S": "Crooked Media Description"},
  "IMAGE": {"S": "https://is3-ssl.mzstatic.com/image/thumb/Music118/v4/cc/96/de/cc96de50-f978-80f6-6be3-26d41369a10b/source/100x100bb.jpg"}
}
ITEM
}

resource "aws_dynamodb_table_item" "episode_one" {
  table_name    = "EPISODE"
  hash_key      = "GUID"

  item = <<ITEM
{
  "GUID": {"S": "12345"},
  "TITLE": {"S": "A Guide to Georgia's Senate Runoffs"},
  "AUTHOR": {"S": "The New York Times"},
  "PODCAST_ID": {"S": "12345"},
  "PODCAST_TITLE": {"S": "The Daily"},
  "DESCRIPTION": {"S": "In three weeks, an election will take place that could be as important as the presidential vote in determining the course of the next four years.</p><p>The Jan. 5 runoff elections in Georgia will determine whether two Republican senators, David Perdue and Kelly Loeffler, keep their seats. If their Democratic challengers, Jon Ossoff and the Rev. Raphael Warnock, both win, Democrats would claim control of the Senate, giving President-Elect Joe Biden expanded power to realize his policy agenda. Today, we offer a guide to the two Senate races in Georgia."},
  "AUDIO_URL": {"S": "https://dts.podtrac.com/redirect.mp3/chtbl.com/track/8DB4DB/rss.art19.com/episodes/4fac47c0-7e56-4fa9-a233-f76c90bc55ed.mp3"},
  "PUBLICATION_DATE": {"N": "1607712554000"},
  "DURATION": {"N": "3600"},
  "PLAY_COUNT": {"N": "0"}
}
ITEM
}

resource "aws_dynamodb_table_item" "episode_two" {
  table_name    = "EPISODE"
  hash_key      = "GUID"

  item = <<ITEM
{
  "GUID": {"S": "23456"},
  "TITLE": {"S": "The Mitch Who Stole Christmas"},
  "AUTHOR": {"S": "Crooked Media"},
  "PODCAST_ID": {"S": "23456"},
  "PODCAST_TITLE": {"S": "Pod Save America"},
  "DESCRIPTION": {"S": "Mitch McConnell blocks bipartisan pandemic relief to help his corporate pals, Joe Biden continues to staff up his Cabinet and White House, and Republicans run their 2020 playbook in Georgia. Then messaging expert Anat Shenker-Osorio talks to Jon about why Democrats need to stop selling the recipe and start selling the brownie. Learn more about your ad choices. Visit podcastchoices.com/adchoices"},
  "AUDIO_URL": {"S": "https://traffic.megaphone.fm/DGT7555925469.mp3"},
  "PUBLICATION_DATE": {"N": "1607626154000"},
  "DURATION": {"N": "3600"},
  "PLAY_COUNT": {"N": "0"}
}
ITEM
}


resource "aws_dynamodb_table_item" "rss_schedule_one" {
  table_name    = "RSS_SCHEDULE"
  hash_key      = "GUID"

  item = <<ITEM
{
  "GUID": {"S": "12345"},
  "PODCAST_ID": {"S": "23456"},
  "RSS_URL": {"S": "http://feeds.feedburner.com/pod-save-america"},
  "CRON": {"S": "*/15 * * * *"},
  "NEXT_START": {"N": "253402300799"}
}
ITEM
}

resource "aws_dynamodb_table_item" "rss_schedule_two" {
  table_name    = "RSS_SCHEDULE"
  hash_key      = "GUID"

  item = <<ITEM
{
  "GUID": {"S": "23456"},
  "PODCAST_ID": {"S": "23456"},
  "RSS_URL": {"S": "http://feeds.feedburner.com/pod-save-america"},
  "CRON": {"S": "*/15 * * * *"},
  "NEXT_START": {"N": "${var.oneMinFromNow}"}
}
ITEM
}

resource "aws_dynamodb_table_item" "rss_schedule_three" {
  table_name    = "RSS_SCHEDULE"
  hash_key      = "GUID"

  item = <<ITEM
{
  "GUID": {"S": "34567"},
  "PODCAST_ID": {"S": "12345"},
  "RSS_URL": {"S": "http://rss.art19.com/the-daily"},
  "CRON": {"S": "*/5 * * * *"},
  "NEXT_START": {"N": "253402300799"}
}
ITEM
}

resource "aws_dynamodb_table_item" "rss_schedule_four" {
  table_name    = "RSS_SCHEDULE"
  hash_key      = "GUID"

  item = <<ITEM
{
  "GUID": {"S": "45678"},
  "PODCAST_ID": {"S": "12345"},
  "RSS_URL": {"S": "http://rss.art19.com/the-daily"},
  "CRON": {"S": "*/5 * * * *"},
  "NEXT_START": {"N": "${var.thirtySecsFromNow}"}
}
ITEM
}