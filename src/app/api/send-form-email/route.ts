import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey === 'your-resend-api-key-here') {
      console.error('[send-form-email] RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please set RESEND_API_KEY.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { prenom, email, telephone, secteur, budget, siteweb, siteurl, objectif, lang } = await req.json();

    const isEn = lang === 'en';

    console.log(`[send-form-email] Sending admin notification (lang: ${isEn ? 'en' : 'fr'}) to start@clicklead.io`);

    // 1. Notification email to admin
    const adminSubject = isEn
      ? `New request from ${prenom}`
      : `Nouvelle demande de ${prenom}`;

    const adminHtml = isEn ? `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#0A1D3E;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
            <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 6px;letter-spacing:-0.3px;">📬 New request received</h1>
            <p style="color:#e2eaf5;font-size:14px;margin:0;">A prospect just submitted the form (English version)</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:36px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
              <tr style="background:#f8fafc;">
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;width:38%;border-bottom:1px solid #e2e8f0;">First name</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${prenom}</td>
              </tr>
              <tr>
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;">Email</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${email}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;">Phone</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${telephone}</td>
              </tr>
              <tr>
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;">Industry</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${secteur}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;">Monthly budget</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${budget}</td>
              </tr>
              <tr>
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;">Website</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${siteweb === 'oui' ? 'Yes — ' + siteurl : 'No'}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;">Goal</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;">${objectif}</td>
              </tr>
            </table>
            <div style="margin-top:28px;text-align:center;">
              <a href="mailto:${email}" style="display:inline-block;background:#0A1D3E;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">Reply to prospect →</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#0f172a;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
            <p style="color:#64748b;font-size:12px;margin:0;">Clicklead — Lead generation agency · <a href="https://clicklead.io" style="color:#60a5fa;text-decoration:none;">clicklead.io</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>` : `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#0A1D3E 0%,#0A1D3E 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
            <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 6px;letter-spacing:-0.3px;">📬 Nouvelle demande reçue</h1>
            <p style="color:#e2eaf5;font-size:14px;margin:0;">Un prospect vient de soumettre le formulaire</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:36px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
              <tr style="background:#f8fafc;">
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;width:38%;border-bottom:1px solid #e2e8f0;">Prénom</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${prenom}</td>
              </tr>
              <tr>
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;">Email</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${email}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;">Téléphone</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${telephone}</td>
              </tr>
              <tr>
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;">Secteur</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${secteur}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;">Budget mensuel</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${budget}</td>
              </tr>
              <tr>
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;">Site web</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0;">${siteweb === 'oui' ? 'Oui — ' + siteurl : 'Non'}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 18px;font-weight:700;color:#475569;font-size:13px;">Objectif</td>
                <td style="padding:12px 18px;color:#0f172a;font-size:14px;">${objectif}</td>
              </tr>
            </table>
            <div style="margin-top:28px;text-align:center;">
              <a href="mailto:${email}" style="display:inline-block;background:#0A1D3E;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">Répondre au prospect →</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#0f172a;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
            <p style="color:#64748b;font-size:12px;margin:0;">Clicklead — Agence de génération de leads · <a href="https://clicklead.io" style="color:#60a5fa;text-decoration:none;">clicklead.io</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const adminResult = await resend.emails.send({
      from: 'Clicklead <start@clicklead.io>',
      to: ['start@clicklead.io'],
      subject: adminSubject,
      html: adminHtml,
    });

    if (adminResult.error) {
      console.error('[send-form-email] Admin email error:', JSON.stringify(adminResult.error));
      return NextResponse.json({ error: adminResult.error.message }, { status: 500 });
    }

    console.log('[send-form-email] Admin email sent, id:', adminResult.data?.id);

    // 2. Confirmation email to lead
    console.log('[send-form-email] Sending confirmation to lead:', email);

    const leadSubject = isEn
      ? `${prenom}, we've received your request ✅`
      : `${prenom}, votre demande a bien été reçue ✅`;

    const leadHtml = isEn ? `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#0A1D3E;border-radius:16px 16px 0 0;padding:44px 40px 36px;text-align:center;">
            <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0 0 10px;letter-spacing:-0.5px;">Thank you ${prenom}! 🎉</h1>
            <p style="color:#e2eaf5;font-size:16px;margin:0 0 4px;line-height:1.5;">We've received your request.</p>
            <p style="color:#e2eaf5;font-size:16px;margin:0;line-height:1.5;">Here's what happens next:</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px 40px 32px;">
            <h2 style="color:#0f172a;font-size:18px;font-weight:700;margin:0 0 24px;text-align:center;">Next steps</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td width="52" valign="top" style="padding-top:2px;">
                  <div style="width:40px;height:40px;background:#0A1D3E;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;font-weight:800;font-size:16px;">1</div>
                </td>
                <td style="padding-left:16px;">
                  <p style="margin:0 0 4px;font-weight:700;color:#0f172a;font-size:15px;">We analyze your request</p>
                  <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">Our team studies your industry, goals and budget to prepare the best strategy.</p>
                </td>
              </tr>
            </table>
            <div style="margin-left:20px;border-left:2px dashed #bfdbfe;height:16px;margin-bottom:16px;"></div>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td width="52" valign="top" style="padding-top:2px;">
                  <div style="width:40px;height:40px;background:#0A1D3E;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;font-weight:800;font-size:16px;">2</div>
                </td>
                <td style="padding-left:16px;">
                  <p style="margin:0 0 4px;font-weight:700;color:#0f172a;font-size:15px;">We contact you within 24h</p>
                  <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">A Clicklead expert will call or write to discuss your project and answer your questions.</p>
                </td>
              </tr>
            </table>
            <div style="margin-left:20px;border-left:2px dashed #bfdbfe;height:16px;margin-bottom:16px;"></div>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td width="52" valign="top" style="padding-top:2px;">
                  <div style="width:40px;height:40px;background:#0A1D3E;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;font-weight:800;font-size:16px;">3</div>
                </td>
                <td style="padding-left:16px;">
                  <p style="margin:0 0 4px;font-weight:700;color:#0f172a;font-size:15px;">We prepare your personalized estimate</p>
                  <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">We build a tailored proposal with estimated lead volume, cost per lead and expected ROI.</p>
                </td>
              </tr>
            </table>
            <div style="margin-left:20px;border-left:2px dashed #bfdbfe;height:16px;margin-bottom:16px;"></div>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
              <tr>
                <td width="52" valign="top" style="padding-top:2px;">
                  <div style="width:40px;height:40px;background:#16a34a;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;font-weight:800;font-size:16px;">🚀</div>
                </td>
                <td style="padding-left:16px;">
                  <p style="margin:0 0 4px;font-weight:700;color:#0f172a;font-size:15px;">We launch together</p>
                  <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">Once approved, we activate your campaigns and the first leads come in quickly.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:28px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="color:#475569;font-size:14px;margin:0 0 20px;line-height:1.6;">Questions? Reply directly to this email or visit our website.</p>
            <a href="https://clicklead.io" style="display:inline-block;background:#0A1D3E;color:#ffffff;font-size:14px;font-weight:700;padding:14px 36px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">Visit clicklead.io →</a>
          </td>
        </tr>
        <tr>
          <td style="background:#0f172a;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
            <p style="color:#64748b;font-size:12px;margin:0;">Clicklead — Lead generation agency · <a href="https://clicklead.io" style="color:#60a5fa;text-decoration:none;">clicklead.io</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>` : `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#0A1D3E 0%,#0A1D3E 100%);border-radius:16px 16px 0 0;padding:44px 40px 36px;text-align:center;">
            <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0 0 10px;letter-spacing:-0.5px;">Merci ${prenom} ! 🎉</h1>
            <p style="color:#e2eaf5;font-size:16px;margin:0 0 4px;line-height:1.5;">Votre demande a bien été reçue.</p>
            <p style="color:#e2eaf5;font-size:16px;margin:0;line-height:1.5;">Voici ce qui se passe maintenant :</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px 40px 32px;">
            <h2 style="color:#0f172a;font-size:18px;font-weight:700;margin:0 0 24px;text-align:center;">Les prochaines étapes</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td width="52" valign="top" style="padding-top:2px;">
                  <div style="width:40px;height:40px;background:#0A1D3E;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;font-weight:800;font-size:16px;">1</div>
                </td>
                <td style="padding-left:16px;">
                  <p style="margin:0 0 4px;font-weight:700;color:#0f172a;font-size:15px;">On analyse votre demande</p>
                  <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">Notre équipe étudie votre secteur, vos objectifs et votre budget pour préparer la meilleure stratégie.</p>
                </td>
              </tr>
            </table>
            <div style="margin-left:20px;border-left:2px dashed #bfdbfe;height:16px;margin-bottom:16px;"></div>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td width="52" valign="top" style="padding-top:2px;">
                  <div style="width:40px;height:40px;background:#0A1D3E;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;font-weight:800;font-size:16px;">2</div>
                </td>
                <td style="padding-left:16px;">
                  <p style="margin:0 0 4px;font-weight:700;color:#0f172a;font-size:15px;">On vous contacte sous 24h</p>
                  <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">Un expert Clicklead vous appelle ou vous écrit pour échanger sur votre projet et répondre à vos questions.</p>
                </td>
              </tr>
            </table>
            <div style="margin-left:20px;border-left:2px dashed #bfdbfe;height:16px;margin-bottom:16px;"></div>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td width="52" valign="top" style="padding-top:2px;">
                  <div style="width:40px;height:40px;background:#0A1D3E;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;font-weight:800;font-size:16px;">3</div>
                </td>
                <td style="padding-left:16px;">
                  <p style="margin:0 0 4px;font-weight:700;color:#0f172a;font-size:15px;">On prépare votre estimation personnalisée</p>
                  <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">Nous construisons une proposition sur-mesure avec le volume de leads estimé, le coût par lead et le ROI attendu.</p>
                </td>
              </tr>
            </table>
            <div style="margin-left:20px;border-left:2px dashed #bfdbfe;height:16px;margin-bottom:16px;"></div>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
              <tr>
                <td width="52" valign="top" style="padding-top:2px;">
                  <div style="width:40px;height:40px;background:#16a34a;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;font-weight:800;font-size:16px;">🚀</div>
                </td>
                <td style="padding-left:16px;">
                  <p style="margin:0 0 4px;font-weight:700;color:#0f172a;font-size:15px;">On lance ensemble</p>
                  <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">Dès validation, on active vos campagnes et les premiers leads arrivent rapidement.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:28px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="color:#475569;font-size:14px;margin:0 0 20px;line-height:1.6;">Des questions ? Répondez directement à cet email ou visitez notre site.</p>
            <a href="https://clicklead.io" style="display:inline-block;background:#0A1D3E;color:#ffffff;font-size:14px;font-weight:700;padding:14px 36px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">Visiter clicklead.io →</a>
          </td>
        </tr>
        <tr>
          <td style="background:#0f172a;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
            <p style="color:#64748b;font-size:12px;margin:0;">Clicklead — Agence de génération de leads · <a href="https://clicklead.io" style="color:#60a5fa;text-decoration:none;">clicklead.io</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const leadResult = await resend.emails.send({
      from: 'Clicklead <start@clicklead.io>',
      to: [email],
      subject: leadSubject,
      html: leadHtml,
    });

    if (leadResult.error) {
      console.error('[send-form-email] Lead email error:', JSON.stringify(leadResult.error));
    } else {
      console.log('[send-form-email] Lead email sent, id:', leadResult.data?.id);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[send-form-email] Unexpected error:', message, error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
