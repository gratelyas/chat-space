json.id @message.id
json.user_name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d/(%a) %H時%M分")
json.content @message.content
json.image @message.image_url
#idもデータとして渡す
json.id @message.id
