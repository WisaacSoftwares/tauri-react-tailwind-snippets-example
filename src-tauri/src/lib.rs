use tauri_plugin_prevent_default::PlatformOptions;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_prevent_default::Builder::new()
                .platform(
                    PlatformOptions::new()
                        // Whether general form information should be saved and autofilled.
                        .general_autofill(true)
                        // Whether password information should be autosaved.
                        .password_autosave(false)
                        // Whether browser-specific accelerator keys are enabled.
                        .browser_accelerator_keys(false)
                        // Whether the default context menus are shown in the webview.
                        .default_context_menus(false)
                        // Whether the webview renders the default JavaScript dialog box.
                        .default_script_dialogs(true),
                )
                .build(),
        )
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
