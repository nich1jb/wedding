from firebase_admin import initialize_app, firestore
import csv

def get_data():
    initialize_app()
    db = firestore.client()
    ref = db.collection("guests")
    db_dict = { el.id: el.to_dict() for el in ref.get() }
    db_list = []
    for key, object in db_dict.items():
        for guest in object.get("guests", []):
            db_list.append([
                key, 
                str(object.get('address', '')),
                str(object.get('children', '')),
                str(guest.get('name', '')),
                str(guest.get('dietaries', '')),
            ])
            
    return db_list

def download_csv():
    rsvp_info = ['Email', 'Address', 'Children', 'Name', 'Dietaries']
    with open('rsvps.csv', 'w') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(rsvp_info)
        writer.writerows(get_data())
