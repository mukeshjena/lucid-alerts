# Security Policy

## Supported Versions

We actively support the following versions of LucidAlerts with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of LucidAlerts seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: [your-security-email@example.com]

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the following information in your report:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

### Preferred Languages

We prefer all communications to be in English.

## Security Update Process

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions
2. Audit code to find any potential similar problems
3. Prepare fixes for all releases still under maintenance
4. Release new versions as soon as possible

## Security Best Practices

When using LucidAlerts in your applications:

1. **Input Validation**: Always validate and sanitize user input before displaying it in alerts
2. **XSS Prevention**: Be cautious when using HTML content in alerts - prefer text content when possible
3. **CSP Headers**: Implement Content Security Policy headers to prevent XSS attacks
4. **Keep Updated**: Always use the latest version of LucidAlerts
5. **Secure Configuration**: Review your alert configurations to ensure they don't expose sensitive information

## Known Security Considerations

### HTML Content
LucidAlerts supports HTML content in alerts. When using this feature:
- Never insert unsanitized user input directly into HTML content
- Use text content instead of HTML when possible
- Implement proper input validation and sanitization

### Custom CSS Classes
When using custom CSS classes:
- Ensure custom styles don't introduce security vulnerabilities
- Be cautious with CSS that might affect page layout or user interaction

## Acknowledgments

We would like to thank the following individuals for their responsible disclosure of security vulnerabilities:

- (No vulnerabilities reported yet)

## Contact

For any questions about this security policy, please contact us at [your-security-email@example.com].