# 라이브러리를 만들자 05 - Email Manager

Email Manager
background로 실행되면서 필요할 때 notification을 Email로 발송하는 프로그램

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Mail;
using System.Net;
using System.Configuration;

namespace BabyCarrot.Tools
{
    public class EmailManager
    {
        public static void Send(string to, string subject, string contents)
        {
            // validation이 필요함
            string sender = ConfigurationManager.AppSettings["SMTPSender"];

            string smtpHost = ConfigurationManager.AppSettings["SMTPHost"];
            int smtpPort = 0;
            if (ConfigurationManager.AppSettings["SMTPPort"] == null ||
                int.TryParse(ConfigurationManager.AppSettings["SMTPPort"], out smtpPort) == false)
                smtpPort = 25;  // default

            string smtpId = ConfigurationManager.AppSettings["SMTPID"];
            string smtpPwd = ConfigurationManager.AppSettings["SMTPPassword"];

            MailMessage mailMsg = new MailMessage();
            mailMsg.From = new MailAddress(sender);
            mailMsg.To.Add(new MailAddress(to));
            // mailMsg.To.Add(to); ,로 구분된 문자열도 가능

            mailMsg.Subject = subject;
            mailMsg.IsBodyHtml = true;
            mailMsg.Body = contents;
            mailMsg.Priority = MailPriority.Normal;

            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Credentials = new NetworkCredential(smtpId, smtpPwd);
            smtpClient.Host = smtpHost;
            smtpClient.Port = smtpPort;
            smtpClient.Send(mailMsg);
        }
    }
}
```

코드를 조금씩 나누어서 살펴보자.

```cs
MailMessage mailMsg = new MailMessage();
mailMsg.From = new MailAddress(sender);
mailMsg.To.Add(new MailAddress(to));
// mailMsg.To.Add(to); ,로 구분된 문자열도 가능
```

메일을 보내기 위해서는 MailMessage라는 클래스를 사용한다. 이 클래스는 System.Net.Mail namespace에 존재한다. 보내는 사람과 받는 사람을 지정한다. 받는 사람은 Collections를 전달할 수도 있고 문자열을 전달할 수도 있다. 문자열은 `,`로 구분하여 여러 메일 주소를 적을 수 있다.

```cs
mailMsg.Subject = subject;
mailMsg.IsBodyHtml = true;
mailMsg.Body = contents;
mailMsg.Priority = MailPriority.Normal;
```

MailMessage 객체에 각 항목들을 채운다. IsBodyHtml은 body의 내용을 html 형태로 전송할 것인가를 확인한다.

```cs
SmtpClient smtpClient = new SmtpClient();
smtpClient.Credentials = new NetworkCredential(smtpId, smtpPwd);
smtpClient.Host = smtpHost;
smtpClient.Port = smtpPort;
smtpClient.Send(mailMsg);
```

SmtpClient 클래스의 인스턴스를 생성하여 메일 서버에 메일을 전달한다.
인증을 위해 NetWorkCredential 클래스를 이용한다. 마지막으로 Send 메서드를 이용하여 메일을 발송한다.

```cs
string sender = ConfigurationManager.AppSettings["SMTPSender"];

string smtpHost = ConfigurationManager.AppSettings["SMTPHost"];
int smtpPort = 0;
if (ConfigurationManager.AppSettings["SMTPPort"] == null ||
    int.TryParse(ConfigurationManager.AppSettings["SMTPPort"], out smtpPort) == false)
    smtpPort = 25;  // default

string smtpId = ConfigurationManager.AppSettings["SMTPID"];
string smtpPwd = ConfigurationManager.AppSettings["SMTPPassword"];
```

일부 설정을 코드내에 입력해둘 수도 있지만 App.config라는 설정파일을 이용한다. App.config 파일을 EmailManager.cs 파일이 존재하는 프로젝트가 아니라 EmailManager를 사용하는 프로젝트에 설정한다.

App.config 파일은 xml 형식이고 해당 내용을 불러오려면 ConfigurationManager 클래스를 활용한다.

`ConfigurationManager.AppSettings["SMTPSender"];`의 return value는 string이다.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <configSections>
  </configSections>
  <startup>
    <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.0" />
  </startup>
  <appSettings>
    <add key="SMTPSender" value="do_not_reply@test.com"/>
    <add key="SMTPHost" value="smtp.com"/>
    <add key="SMTPPort" value="2525"/>
    <add key="SMTPID" value="id"/>
    <add key="SMTPPassword" value="password"/>
  </appSettings>
</configuration>
```

app.config의 내용이다. configuration/configSection은 건들지 않도록 한다. 순서도 유지해야 한다.
appSetting tag를 추가하여 key, value 형식으로 내용을 추가한다.
