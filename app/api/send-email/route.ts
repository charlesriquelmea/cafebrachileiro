import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const mailPrimero = process.env.MAILPRIMERO || "";
const mailSegundo = process.env.MAILSEGUNDO || "";
const mailTercero = process.env.MAILTERCERO || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, business, challenge, lang } = body;

    const fromEmail = "business@business.protolylat.com";

    if (!mailPrimero) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [mailPrimero],
      cc: [mailSegundo, mailTercero],
      subject: `Novo Lead Café Brachileiro: ${name}`,
      html: buildEmailHtml({ name, email, phone, business, challenge, lang }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function buildEmailHtml({
  name,
  email,
  phone,
  business,
  challenge,
  lang,
}: {
  name?: string;
  email?: string;
  phone?: string;
  business?: string;
  challenge?: string;
  lang?: string;
}) {
  const isPt = lang === "pt";
  const gold = "#D9A84E";
  const darkSlate = "#04091A";
  const cardBg = "#071228";
  const textOffWhite = "#FDFAF4";

  return `
<!DOCTYPE html>
<html lang="${isPt ? "pt" : "es"}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${isPt ? "Novo Lead - Café Brachileiro" : "Nuevo Lead - Café Brachileiro"}</title>
</head>
<body style="margin:0;padding:0;background-color:${darkSlate};font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;color:${textOffWhite};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${darkSlate};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding-bottom:32px;text-align:center;">
              <div style="display:inline-block;padding:8px 16px;border:1px solid rgba(217,168,78,0.3);border-radius:100px;margin-bottom:16px;">
                <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${gold};font-weight:700;">
                  ${isPt ? "Novo Cadastro" : "Nuevo Registro"}
                </p>
              </div>
              <h1 style="margin:0;font-size:32px;font-weight:800;color:${textOffWhite};line-height:1.2;letter-spacing:-0.5px;">
                Café Brachileiro ☕
              </h1>
              <p style="margin:12px 0 0;font-size:16px;color:rgba(253,250,244,0.6);">
                ${isPt ? "Novo Cliente Cadastrado" : "Nuevo Cliente Registrado"}
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:${cardBg};border:1px solid rgba(217,168,78,0.2);border-radius:24px;padding:40px;box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding-bottom:32px;">
                    <span style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(217,168,78,0.7);display:block;margin-bottom:8px;font-weight:700;">
                      ${isPt ? "Nome do Cliente" : "Nombre del Cliente"}
                    </span>
                    <span style="font-size:28px;font-weight:800;color:${textOffWhite};">${name || "—"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="50%" style="padding-bottom:24px;vertical-align:top;">
                          <span style="font-size:11px;color:rgba(253,250,244,0.4);display:block;margin-bottom:4px;text-transform:uppercase;font-weight:600;">${isPt ? "Email" : "Correo"}</span>
                          <a href="mailto:${email}" style="font-size:15px;color:${gold};text-decoration:none;font-weight:600;">${email || "—"}</a>
                        </td>
                        <td width="50%" style="padding-bottom:24px;vertical-align:top;">
                          <span style="font-size:11px;color:rgba(253,250,244,0.4);display:block;margin-bottom:4px;text-transform:uppercase;font-weight:600;">WhatsApp</span>
                          <a href="https://wa.me/${(phone || "").replace(/\D/g, "")}" style="font-size:15px;color:${gold};text-decoration:none;font-weight:600;">${phone || "—"}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 0;">
                    <div style="height:1px;background:rgba(217,168,78,0.1);width:100%;"></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom:24px;">
                          <span style="font-size:11px;color:rgba(253,250,244,0.4);display:block;margin-bottom:8px;text-transform:uppercase;font-weight:600;">
                            ${isPt ? "Tipo de Negócio" : "Tipo de Negocio"}
                          </span>
                          <div style="background:rgba(255,255,255,0.03);padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);">
                            <span style="font-size:15px;color:${textOffWhite};font-weight:500;">${business || "—"}</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:8px;">
                          <span style="font-size:11px;color:rgba(253,250,244,0.4);display:block;margin-bottom:8px;text-transform:uppercase;font-weight:600;">
                            ${isPt ? "Desafio Principal" : "Desafío Principal"}
                          </span>
                          <div style="background:rgba(217,168,78,0.05);padding:12px 16px;border-radius:12px;border:1px solid rgba(217,168,78,0.1);">
                            <span style="font-size:15px;color:${gold};font-weight:600;">${challenge || "—"}</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top:40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(253,250,244,0.3);line-height:1.6;">
                ${isPt ? "Este lead é membro do Café Brachileiro." : "Este lead es miembro de Café Brachileiro."}
                <br/>
                © ${new Date().getFullYear()} Café Brachileiro · Cold Brew Coffee Delivery 🇧🇷🇨🇱
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
