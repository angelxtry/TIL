# 라이브러리를 만들자 06 - Email Manager

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
        #region Static Method
        public static void Send(string from, string to, string subject, string contents, string cc, string bcc)
        {
            if (String.IsNullOrEmpty(from))
                throw new ArgumentException("Sender is empty.");
            if (String.IsNullOrEmpty(to))
                throw new ArgumentException("To is empty.");

            string smtpHost = ConfigurationManager.AppSettings["SMTPHost"];
            int smtpPort = 0;
            if (ConfigurationManager.AppSettings["SMTPPort"] == null ||
                int.TryParse(ConfigurationManager.AppSettings["SMTPPort"], out smtpPort) == false)
                smtpPort = 25;  // default

            string smtpId = ConfigurationManager.AppSettings["SMTPID"];
            string smtpPwd = ConfigurationManager.AppSettings["SMTPPassword"];

            MailMessage mailMsg = new MailMessage();
            mailMsg.From = new MailAddress(from);
            mailMsg.To.Add(new MailAddress(to));
            // mailMsg.To.Add(to); ,로 구분된 문자열도 가능

            if (!string.IsNullOrEmpty(cc))
                mailMsg.CC.Add(cc);
            if (!string.IsNullOrEmpty(bcc))
                mailMsg.Bcc.Add(bcc);

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

        public static void Send(string from, string to, string subject, string contents)
        {
            // validation이 필요함
            Send(from, to, subject, contents, null, null);
        }

        public static void Send(string to, string subject, string contents)
        {
            // validation이 필요함
            string sender = ConfigurationManager.AppSettings["SMTPSender"];
            Send(sender, to, subject, contents);
        }
        #endregion
    }
}
```

송신자를 고정하지 않고 변화시키기 위해 from 매개변수를 추가하고 Send 메소드를 overriding 했다.

cc, bcc도 동일한 방식으로 추가

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
        private MailMessage _MailMessage;
        private SmtpClient _SmtpClient;

        public EmailManager(string host, int port, string id, string password)
        {
            _SmtpClient = new SmtpClient(host, port);
            _SmtpClient.Credentials = new NetworkCredential(id, password);

            _MailMessage = new MailMessage();
            _MailMessage.IsBodyHtml = true;
            _MailMessage.Priority = MailPriority.Normal;
        }

        public string From
        {
            get { return _MailMessage.From == null ? string.Empty : _MailMessage.From.Address; }
            set { _MailMessage.From = new MailAddress(value); }
        }

        public MailAddressCollection To
        {
            get { return _MailMessage.To; }
        }

        public string Subject
        {
            get { return _MailMessage.Subject; }
            set { _MailMessage.Subject = value; }
        }

        public string Body
        {
            get { return _MailMessage.Body; }
            set { _MailMessage.Body = value; }
        }

        public void Send()
        {
            _SmtpClient.Send(_MailMessage);
        }

        #region Static Method
        public static void Send(string from, string to, string subject, string contents, string cc, string bcc)
        {
            if (String.IsNullOrEmpty(from))
                throw new ArgumentException("Sender is empty.");
            if (String.IsNullOrEmpty(to))
                throw new ArgumentException("To is empty.");

            string smtpHost = ConfigurationManager.AppSettings["SMTPHost"];
            int smtpPort = 0;
            if (ConfigurationManager.AppSettings["SMTPPort"] == null ||
                int.TryParse(ConfigurationManager.AppSettings["SMTPPort"], out smtpPort) == false)
                smtpPort = 25;  // default

            string smtpId = ConfigurationManager.AppSettings["SMTPID"];
            string smtpPwd = ConfigurationManager.AppSettings["SMTPPassword"];

            MailMessage mailMsg = new MailMessage();
            mailMsg.From = new MailAddress(from);
            mailMsg.To.Add(new MailAddress(to));
            // mailMsg.To.Add(to); ,로 구분된 문자열도 가능

            if (!string.IsNullOrEmpty(cc))
                mailMsg.CC.Add(cc);
            if (!string.IsNullOrEmpty(bcc))
                mailMsg.Bcc.Add(bcc);

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

        public static void Send(string from, string to, string subject, string contents)
        {
            // validation이 필요함
            Send(from, to, subject, contents, null, null);
        }

        public static void Send(string to, string subject, string contents)
        {
            // validation이 필요함
            string sender = ConfigurationManager.AppSettings["SMTPSender"];
            Send(sender, to, subject, contents);
        }
        #endregion
    }
}
```

App.config 파일을 사용하지 않고 모든 값을 인자로 받아서 처리할 수 있도록 수정했다.
생성자에서 host, port, id, password를 처리하고, from, to, subject, body 등을 프로퍼티를 사용하여 처리한다.

send 메소드를 추가하여 static으로 만든 send 메소드와 이름은 겹치지만 전혀 다른 방식으로 처리할 수 있도록 한다.
