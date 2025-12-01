import re
import json

md_pattern = r'\[(.*?)\]\((.*?)\)'

def get_image_properties(line):
    match_object = re.search(md_pattern, line)
    caption = match_object.group(1)
    image = match_object.group(2)

    return {
        'caption': caption, 
        'image': image
        }

def read_file(filename):

    photos = []

    with open(filename, 'r') as file:
        lines = file.readlines()

        image = {}

        for line in lines:
            line = line.strip()
            if line.startswith('!'):
                image = get_image_properties(line)
            elif len(line) == 0:
                photos.append(image)
            elif len(line) > 0:
                image['people'] = line.split(', ')
                

    print(photos)

    return photos

def write_file(data, filename):
    with open(filename, 'w') as file:
        file.write(json.dumps(data, indent=3))

photos = read_file('w:/chamfam.net/FamilyHistory/1980 Nowland cousins at the beach/proof sheet.md')

data = {
    "image_dir": "/FamilyHistory/1980 Nowland cousins at the beach",
    "images": photos
}

write_file(data, 'w:/chamfam.net/FamilyHistory/1980 Nowland cousins at the beach/data.json')