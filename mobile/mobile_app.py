import kivy
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.scrollview import ScrollView
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.network.urlrequest import UrlRequest

# --- Configuration ---
# Replace with your live Render backend URL
BASE_API_URL = "https://codecart-backend.onrender.com/api"

# --- Reusable Content Screen ---
# We create a generic screen that can fetch and display items from any endpoint.
class ContentScreen(Screen):
    def __init__(self, endpoint, title, **kwargs):
        super().__init__(**kwargs)
        self.endpoint = endpoint
        self.title_text = title
        
        layout = BoxLayout(orientation='vertical', padding=20, spacing=10)
        
        title_label = Label(
            text=self.title_text,
            font_size='24sp',
            size_hint_y=None,
            height=50,
            bold=True
        )
        layout.add_widget(title_label)

        # Create a scrollable view for the content
        scroll_view = ScrollView()
        self.content_list = BoxLayout(orientation='vertical', size_hint_y=None, spacing=10)
        self.content_list.bind(minimum_height=self.content_list.setter('height'))
        scroll_view.add_widget(self.content_list)
        layout.add_widget(scroll_view)
        
        self.add_widget(layout)
        
    def on_enter(self):
        # This function is called every time the screen is shown
        self.fetch_content()

    def fetch_content(self):
        self.content_list.clear_widgets()
        self.content_list.add_widget(Label(text=f'Loading {self.title_text}...'))
        
        full_url = f"{BASE_API_URL}/{self.endpoint}"
        UrlRequest(full_url, on_success=self.on_success, on_failure=self.on_error, on_error=self.on_error)

    def on_success(self, request, result):
        self.content_list.clear_widgets()
        
        if not result:
            self.content_list.add_widget(Label(text=f'No {self.title_text} found.'))
            return

        for item in result:
            # Display 'subject' for notes/pyqs and 'name' for products/blogs
            title = item.get('subject') or item.get('name') or item.get('title', 'No Title')
            
            item_label = Label(
                text=f"[b]{title}[/b]",
                markup=True,
                size_hint_y=None,
                height=60,
                text_size=(self.width - 40, None),
                halign='left',
                valign='middle'
            )
            self.content_list.add_widget(item_label)

    def on_error(self, request, error):
        self.content_list.clear_widgets()
        self.content_list.add_widget(Label(text=f'Failed to load {self.title_text}.'))


# --- Main Application ---
class CodecartApp(App):
    def build(self):
        # Create the main layout
        root = BoxLayout(orientation='vertical')
        
        # Create the screen manager
        sm = ScreenManager()
        
        # Create and add a screen for each content type
        sm.add_widget(ContentScreen(name='notes', endpoint='notes', title='Notes'))
        sm.add_widget(ContentScreen(name='pyqs', endpoint='pyqs', title='PYQs'))
        sm.add_widget(ContentScreen(name='blogs', endpoint='blogs', title='Blogs'))
        sm.add_widget(ContentScreen(name='products', endpoint='products', title='Products'))
        
        # Create the bottom navigation bar
        nav_bar = BoxLayout(size_hint_y=None, height=50, spacing=5)
        
        # Create buttons for the navigation bar
        btn_notes = Button(text='Notes', on_press=lambda x: setattr(sm, 'current', 'notes'))
        btn_pyqs = Button(text='PYQs', on_press=lambda x: setattr(sm, 'current', 'pyqs'))
        btn_blogs = Button(text='Blogs', on_press=lambda x: setattr(sm, 'current', 'blogs'))
        btn_products = Button(text='Products', on_press=lambda x: setattr(sm, 'current', 'products'))
        
        nav_bar.add_widget(btn_notes)
        nav_bar.add_widget(btn_pyqs)
        nav_bar.add_widget(btn_blogs)
        nav_bar.add_widget(btn_products)
        
        # Add the screen manager and navigation bar to the root layout
        root.add_widget(sm)
        root.add_widget(nav_bar)
        
        return root

if __name__ == '__main__':
    CodecartApp().run()