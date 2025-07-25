data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }
}

resource "aws_instance" "web_server" {
  ami           = data.aws_ami.amazon_linux_2023.id
  instance_type = "t3.micro"
  key_name      = var.ssh_key_name
  
  user_data = file("userdata.sh")

  vpc_security_group_ids = [var.sg_id]

  tags = {
    Name = "${var.prefix}-${var.index}"
  }
}