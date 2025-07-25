data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_instance" "web_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"
  key_name      = var.ssh_key_name
  
  user_data = file("userdata.sh")

  vpc_security_group_ids = [aws_security_group.sg.id]

  tags = {
    Name = "${var.prefix}-${var.index}"
  }
}