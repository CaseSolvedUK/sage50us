frappe.pages['sage-50-importer'].on_page_load = function(wrapper) {
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Sage 50 Importer',
		single_column: true
	});

	new erpnext.Sage50USImporter(page);
}

erpnext.Sage50USImporter = class Sage50USImporter {
	constructor(page) {
		this.page = page;
		this.make_form();
	}

	make_form() {
		const controls = $('<div id="controls" class="frappe-card mb-4"></div>').appendTo(this.page.body);
		const progress = $('<div id="progress" class="frappe-card"></div>').appendTo(this.page.body);
		this.controls = new frappe.ui.FieldGroup({
			body: controls,
			fields: [
				{
					label: __('Import ZIP File'),
					fieldname: 'file',
					fieldtype: 'Attach'
				},
				{
					label: __('Start Import'),
					fieldname: 'start',
					fieldtype: 'Button',
					click: () => this.start()
				},
				{
					fieldtype: 'Column Break'
				},
				{
					label: __('ZIP Filename is Company Name'),
					fieldname: 'filename_is_company',
					fieldtype: 'Check'
				},
				{
					label: __('Help'),
					fieldname: 'help',
					fieldtype: 'HTML',
					options: `
Attach a zip file, like <strong>Branch1.zip</strong> which contains the CSV exports from Sage 50.<br>
The CSV file names must be:
ACCOUNT.CSV, PAYMENTS.CSV, PO.CSV, PURCHASE.CSV, VENDOR.CSV, CONTACTS.CSV, etc.<br>
The files can also be organised into directories.<br><br>
If you tick the <strong>ZIP Filename is Company Name</strong> checkbox, the data will be imported into the company of that name.
If the company does not exist, it will be created. Company name checking is case-insensitive.<br>
Otherwise the data will be imported into the Default Company.<br><br>
If document names clash they will be skipped and shown in the progress list below.
`
				}
			]
		});
		this.controls.make();

		this.progress = new frappe.ui.FieldGroup({
			body: progress,
			fields: [
				{
					label: __('Progress'),
					fieldname: 'progress',
					fieldtype: 'HTML'
				}
			]
		});
		this.progress.make();
	}

	start() {
		// Upload and update progress
	}
}
