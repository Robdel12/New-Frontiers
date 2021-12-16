require 'feedjira'
require 'httparty'
require 'sanitize'

# lol
class String
  def truncate(truncate_at, options = {})
    return dup unless length > truncate_at

    options[:omission] ||= '...'
    length_with_room_for_omission = truncate_at - options[:omission].length
    stop = if options[:separator]
      rindex(options[:separator], length_with_room_for_omission) || 
        length_with_room_for_omission
      else
        length_with_room_for_omission
      end

    "#{self[0...stop]}#{options[:omission]}"
  end
end



Feedjira.parse(HTTParty.get("https://medium.com/feed/@robdel12").body).entries.each do |e|
  puts "--------------"
  puts "Generating posts from medium feed..."

  p "Title: #{e.title}, published on Medium #{e.url} #{e}"
  title = e[:title]
  slug = e[:title].downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  content = e[:content]

  front_matter = <<-HEREDOC
---
layout: post
title: "#{title}"
date: #{e[:published].to_s}
excerpt: "#{Sanitize.fragment(content).truncate(225)}"
---

  HEREDOC

  path = "#{__dir__}/_posts/#{e[:published].to_s.split(' ').first}-#{slug}.md"
  File.write(path, "#{front_matter} #{content}")
end
