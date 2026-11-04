# AI data-sharing settings

Where to turn off training or data sharing for six vendors. This checklist copies only what each vendor's own documentation says. An empty field means that documentation does not state it. This tool does not sign in to those accounts and does not change the settings. Re-check the settings after product updates. User reports that an opt-out was turned back on are in the last column. They are not vendor statements.

Vendor pages checked 2026-11-04.

## OpenAI

**Product:** ChatGPT on personal Free, Plus, and Pro workspaces, and Codex tasks on those plans

**Where:** Signed in on the web: open the account menu, select Settings, select Data controls, select Improve the model for everyone, turn it off, and select Done.

iOS and Android: open the sidebar, select the profile icon, select Settings, select Data controls, and turn off Improve the model for everyone.

Signed out: open Settings and turn off Improve the model for everyone. The help article says that choice is saved in that browser.

Codex has a separate Include environments setting in Codex settings. The article does not give a shorter click path than Codex settings.

**What it controls:** Improve the model for everyone chooses whether conversations help train OpenAI models. Turning it off does not delete or hide saved chats.

Include environments controls whether additional context from Codex environments can be used to train OpenAI models. Changing the ChatGPT setting or opting out through the Privacy Portal does not change Include environments. The article names the Privacy Portal and does not give its address.

On personal workspaces, Trusted Access sessions such as Daybreak Blue may still use content to improve models while that session is running, even when Improve the model for everyone is off.

Voice mode has a separate control. This page does not give its click path.

Thumbs up or thumbs down on a response may allow the whole conversation tied to that feedback to be used for training. The article points to How your data is used to improve model performance for that case.

**Default:** On personal workspaces with ChatGPT Free, Plus, or Pro, data sharing is enabled by default.

By default, OpenAI does not use content from ChatGPT Business, Enterprise, Edu, or ChatGPT for Healthcare workspaces to train its models.

By default, OpenAI does not use inputs and outputs provided through the API Platform to train its models.

**Official documentation:**

- https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt

**Notes from those docs:** The Data controls page points to another OpenAI article, How your data is used to improve model performance, for the feedback case. This checklist does not copy that article, so it is not linked here.

**Reports, separate from the vendor docs:** Users on Hacker News reported that Improve the model for everyone had been turned back on for Codex without them opting in. OpenAI's Data controls page, as checked for this checklist, does not mention that report.

**Report link:** https://news.ycombinator.com/item?id=50352757

## Anthropic

**Product:** Claude consumer plans and Claude Code signed in with those plans. The privacy article names Claude Free, Pro, and Max. The Claude Code data-usage page also names Ultra.

**Where:** Desktop or browser, from the privacy article: select your name in the settings menu, select Settings, select Privacy, and under Help Improve our AI models toggle it off or on. The same four steps are given for mobile.

The Claude Code data-usage page says privacy settings can be changed at claude.ai/settings/data-privacy-controls.

**What it controls:** Turning the model-training setting off means new chats and coding sessions are not used for future model training. Data already in a training run that has started, and models already trained, can still include older chats and coding sessions. The privacy article says previously stored chats and coding sessions stop being used in future training runs.

Conversations flagged by safety classifiers may still be used to improve internal trust and safety models, detect harmful content, enforce policies, or advance safety research.

For Team and Enterprise plans, the API, third-party platforms, and Claude Gov, the Claude Code data-usage page says Anthropic does not train generative models on code or prompts sent to Claude Code under commercial terms unless the customer has chosen to provide data for model improvement, for example the Developer Partner Program.

**Default:**

**Official documentation:**

- https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings
- https://code.claude.com/docs/en/data-usage

**Notes from those docs:** The cited pages do not say whether Help Improve our AI models starts on or off for a consumer account.

The data-usage page also says consumer accounts that allow model improvement have a 5-year retention period, and accounts that do not have a 30-day retention period.

**Reports, separate from the vendor docs:**

**Report link:**

## Google

**Product:** Gemini Apps

**Where:** Gemini Apps Activity. Turn off Keep Activity. The help article does not give a shorter menu path than Gemini Apps Activity, and it does not print a URL for that page.

**What it controls:** With Keep Activity off, future chats do not appear in Gemini Apps Activity and are not used to train Google's AI models, unless you submit feedback.

Those chats are still saved with the account for 72 hours so Gemini can respond, process feedback, and help protect Google, its users, and the public.

The article says Gemini settings do not control processing of chats to create anonymized data to improve Google services. It also says that even with Keep Activity off, Google still uses chats to respond and for safety, including with help from human reviewers.

Temporary chats are not used to train Google's AI models. The article says they are also kept for 72 hours.

**Default:**

**Official documentation:**

- https://support.google.com/gemini/answer/13594961

**Notes from those docs:** The same article says the auto-delete period for saved Gemini Apps Activity defaults to 18 months. It does not say whether Keep Activity itself starts on or off.

This row is only the Gemini Apps help article. It does not cover the Gemini API.

**Reports, separate from the vendor docs:**

**Report link:**

## Mistral

**Product:** Vibe, Vibe mobile, Mistral Studio, and the Mistral API, which are the product names on the cited help article

**Where:** Vibe in the Admin panel: under Manage, select Vibe. Under Privacy, disable Allow your interactions to be used to train our models.

Vibe on iOS and Android: open Settings, select Data & Account Controls under Account, and deselect Enable data sharing.

Mistral Studio and the API, in the Admin panel: open Privacy in the left-hand navigation. Under Anonymous improvement data, disable the toggle.

**What it controls:** The Vibe toggle and the API toggle are separate. Opting out of one does not opt out of the other.

The article says that once the Vibe opt-out is confirmed, Mistral no longer uses that input or output data to train its models. Documents attached or uploaded in Vibe count as input data.

Disabling Anonymous improvement data is described as preventing API calls and related data from being used to improve Mistral's services.

**Default:** Vibe: users are not opted out by default.

Vibe (Teams): administrators can disable data training for the whole organization. The article does not state the organization's starting position.

Vibe (Enterprise): customers are opted out of training by default. The opt-in toggle is managed by an admin.

**Official documentation:**

- https://help.mistral.ai/en/articles/455207-can-i-opt-out-of-my-input-or-output-data-being-used-for-training

**Notes from those docs:**

**Reports, separate from the vendor docs:** One comment on the Hacker News thread linked here says that during a Mistral Teams change, per-user training toggles were turned back on, and that Mistral later said it had not stored that data for training. Mistral's help article cited here does not mention that event.

**Report link:** https://news.ycombinator.com/item?id=50352757

## GitHub

**Product:** GitHub Copilot Free, Pro, Pro+, and Max. Business and Enterprise are covered only by the note on the same page.

**Where:** On any GitHub page, select your profile picture in the upper-right corner, then Copilot settings. Open the Allow GitHub to use my data for AI model training menu and select Disabled.

If that menu is missing, the page says to check that the account is not using a Copilot Business or Copilot Enterprise license. The setting is not shown for those plans.

**What it controls:** For Copilot Free, Pro, Pro+, and Max, from 24 April 2026, GitHub may use interactions with GitHub features and services, including inputs, outputs, code snippets, and associated context, to train and improve AI models. The menu above is the opt-out the page describes.

Suggestions matching public code is a different setting on the same settings page. This checklist does not treat it as the training opt-out.

**Default:**

**Official documentation:**

- https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies

**Notes from those docs:** The page says GitHub does not use Copilot Business or Copilot Enterprise customer data to train AI models, and that those customers' data is covered by GitHub's Data Protection Agreement, which prohibits that use without customer authorization.

The page does not say whether Allow GitHub to use my data for AI model training starts as Enabled or Disabled.

**Reports, separate from the vendor docs:**

**Report link:**

## Cursor

**Product:** Cursor

**Where:** Open Cursor Settings. On a Mac, press Cmd + Shift + J. On Windows or Linux, press Ctrl + Shift + J. Select General in the sidebar and turn Privacy Mode on.

Team admins can enforce Privacy Mode for the organization from cursor.com/dashboard so members cannot turn it off. The help page states that path.

**What it controls:** The help page says Privacy Mode means your code is not used for training by Cursor or other model providers.

The data-use page says that with Privacy Mode on, Cursor does not use Customer Data for training, and that model providers will not store or train on that data under Cursor's zero-data-retention agreements. It also says providers may store data when an abuse detector flags it, and that some models are outside those agreements. Those models are off unless an admin opts in. The help page says zero data retention does not apply when you use your own API keys; the provider's privacy policy applies instead.

The data-use page says that with Privacy Mode off, Cursor may use and store codebase data, prompts, editor actions, code snippets, and other code data to improve its AI features and train its models.

**Default:** Teams: Privacy Mode is on by default for every team member.

Enterprise teams: Privacy Mode is on by default.

**Official documentation:**

- https://cursor.com/help/security-and-privacy/privacy
- https://cursor.com/data-use

**Notes from those docs:** The cited pages do not say whether Privacy Mode starts on or off for an individual account that is not on a team or Enterprise plan.

**Reports, separate from the vendor docs:**

**Report link:**

This page is generated from `docs/data-sharing.yaml`. Run `npm run docs` after editing that file.
