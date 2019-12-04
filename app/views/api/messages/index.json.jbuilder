json.array! @messages do |message|
  json.content message.content
  json.image message.image.url
  json.date message.created_at.strftime("%Y/%m/%d/(%a) %H時%M分")
  json.user_name message.user.name
  json.id message.id
end